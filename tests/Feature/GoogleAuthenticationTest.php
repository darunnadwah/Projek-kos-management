<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as GoogleUser;
use Tests\TestCase;

class GoogleAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_page_is_available_and_google_redirect_uses_socialite(): void
    {
        $this->configureGoogleOAuth();
        Socialite::fake('google');

        $this->get(route('login'))
            ->assertInertia(fn (Assert $page) => $page->component('Auth/Login'));

        $this->get(route('auth.google.redirect'))->assertRedirect();
    }

    public function test_verified_google_user_is_created_as_petugas_even_if_request_submits_admin_role(): void
    {
        $this->configureGoogleOAuth();
        Socialite::fake('google', GoogleUser::fake([
            'id' => 'google-123',
            'name' => 'Verified Staff',
            'email' => 'staff@example.com',
            'email_verified' => true,
        ]));

        $response = $this->get(route('auth.google.callback', ['role' => User::ROLE_ADMIN]));

        $response->assertRedirect(route('rooms.index'));
        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'google_id' => 'google-123',
            'email' => 'staff@example.com',
            'role' => User::ROLE_PETUGAS,
        ]);
    }

    public function test_unverified_google_email_is_rejected_without_creating_or_authenticating_a_user(): void
    {
        $this->configureGoogleOAuth();
        Socialite::fake('google', GoogleUser::fake([
            'id' => 'google-unverified',
            'name' => 'Unverified User',
            'email' => 'unverified@example.com',
            'email_verified' => false,
        ]));

        $this->get(route('auth.google.callback'))
            ->assertRedirect(route('login'))
            ->assertSessionHas('error', 'Akun Google harus memiliki email terverifikasi dan nama yang valid.');

        $this->assertGuest();
        $this->assertDatabaseMissing('users', ['email' => 'unverified@example.com']);
    }

    public function test_verified_google_identity_links_to_existing_user_without_changing_admin_role(): void
    {
        $this->configureGoogleOAuth();
        $admin = User::factory()->admin()->create([
            'email' => 'admin@example.com',
            'google_id' => null,
        ]);
        Socialite::fake('google', GoogleUser::fake([
            'id' => 'google-admin',
            'name' => 'Updated Provider Name',
            'email' => 'admin@example.com',
            'email_verified' => true,
        ]));

        $this->get(route('auth.google.callback'))->assertRedirect(route('rooms.index'));

        $this->assertAuthenticatedAs($admin);
        $this->assertDatabaseHas('users', [
            'id' => $admin->id,
            'google_id' => 'google-admin',
            'role' => User::ROLE_ADMIN,
        ]);
    }

    public function test_google_identity_already_linked_to_another_account_is_rejected(): void
    {
        $this->configureGoogleOAuth();
        User::factory()->create([
            'email' => 'staff@example.com',
            'google_id' => 'google-existing',
        ]);
        Socialite::fake('google', GoogleUser::fake([
            'id' => 'google-different',
            'name' => 'Staff',
            'email' => 'staff@example.com',
            'email_verified' => true,
        ]));

        $this->get(route('auth.google.callback'))
            ->assertRedirect(route('login'))
            ->assertSessionHas('error', 'Email ini sudah terhubung ke akun Google lain.');

        $this->assertGuest();
        $this->assertDatabaseCount('users', 1);
    }

    public function test_google_login_can_be_cancelled_without_authenticating(): void
    {
        $this->get(route('auth.google.callback', ['error' => 'access_denied']))
            ->assertRedirect(route('login'))
            ->assertSessionHas('error', 'Login Google dibatalkan.');

        $this->assertGuest();
        $this->assertDatabaseCount('users', 0);
    }

    public function test_logout_invalidates_the_authenticated_session(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('logout'))
            ->assertRedirect(route('login'));

        $this->assertGuest();
        $this->get(route('rooms.index'))->assertRedirect(route('login'));
    }

    private function configureGoogleOAuth(): void
    {
        config([
            'services.google.client_id' => 'test-client-id',
            'services.google.client_secret' => 'test-client-secret',
            'services.google.redirect' => 'http://localhost/auth/google/callback',
        ]);
    }
}
