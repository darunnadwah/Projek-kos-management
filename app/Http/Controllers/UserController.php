<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    private const ROLES = [
        ['value' => 'user', 'label' => 'Penyewa'],
        ['value' => 'admin', 'label' => 'Admin'],
        ['value' => 'superadmin', 'label' => 'Superadmin'],
    ];

    public function index(): Response
    {
        return Inertia::render('Users/Index', [
            'users' => User::query()->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Users/Form', [
            'roles' => self::ROLES,
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        User::create($data);

        return redirect()->route('users.index')->with('message', 'Pengguna berhasil ditambahkan.');
    }

    public function edit(User $user): Response
    {
        return Inertia::render('Users/Form', [
            'user' => $user,
            'roles' => self::ROLES,
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();

        if ($request->user()->is($user) && $data['role'] !== $user->role) {
            abort(403, 'Role akun yang sedang digunakan tidak dapat diubah.');
        }

        if (blank($data['password'] ?? null)) {
            unset($data['password']);
        } else {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return redirect()->route('users.index')->with('message', 'Pengguna berhasil diperbarui.');
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        abort_if($request->user()->is($user), 403, 'Akun yang sedang digunakan tidak dapat dihapus.');

        $user->delete();

        return redirect()->route('users.index')->with('message', 'Pengguna berhasil dihapus.');
    }
}
