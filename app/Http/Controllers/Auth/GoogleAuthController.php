<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;

class GoogleAuthController extends Controller
{
    public function showLogin(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function redirectToGoogle(): SymfonyRedirectResponse|RedirectResponse
    {
        if (blank(config('services.google.client_id')) || blank(config('services.google.client_secret'))) {
            return redirect()
                ->route('login')
                ->with('error', 'Login Google belum dikonfigurasi. Hubungi administrator.');
        }

        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(Request $request): RedirectResponse
    {
        if ($request->filled('error')) {
            return redirect()
                ->route('login')
                ->with('error', 'Login Google dibatalkan.');
        }

        $googleUser = Socialite::driver('google')->user();
        $googleId = (string) $googleUser->getId();
        $email = $googleUser->getEmail();
        $name = $googleUser->getName();
        $emailVerified = filter_var(
            $googleUser->user['email_verified'] ?? false,
            FILTER_VALIDATE_BOOLEAN,
        );

        if (
            $googleId === ''
            || ! filter_var($email, FILTER_VALIDATE_EMAIL)
            || blank($name)
            || mb_strlen($name) > 255
            || ! $emailVerified
        ) {
            return redirect()
                ->route('login')
                ->with('error', 'Akun Google harus memiliki email terverifikasi dan nama yang valid.');
        }

        $user = User::query()->where('google_id', $googleId)->first();

        if ($user === null) {
            $user = User::query()->where('email', $email)->first();

            if ($user !== null && filled($user->google_id) && $user->google_id !== $googleId) {
                return redirect()
                    ->route('login')
                    ->with('error', 'Email ini sudah terhubung ke akun Google lain.');
            }

            if ($user === null) {
                $user = new User([
                    'name' => $name,
                    'email' => $email,
                ]);
                $user->role = User::ROLE_PETUGAS;
            }

            $user->google_id = $googleId;
            $user->save();
        }

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended(route('rooms.index'));
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
