<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class EmailPasswordAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_page_offers_email_password_and_registration(): void
    {
        $this->get(route('login'))
            ->assertInertia(fn (Assert $page) => $page->component('Auth/Login'));

        $this->get(route('register'))
            ->assertInertia(fn (Assert $page) => $page->component('Auth/Register'));
    }

    public function test_user_can_login_with_a_valid_email_and_password(): void
    {
        $user = User::factory()->admin()->create([
            'email' => 'admin@example.com',
            'password' => Hash::make('correct-password'),
        ]);

        $this->post(route('login.store'), [
            'email' => 'ADMIN@EXAMPLE.COM',
            'password' => 'correct-password',
        ])->assertRedirect(route('rooms.index'));

        $this->assertAuthenticatedAs($user);
    }

    public function test_invalid_password_is_rejected_without_authenticating(): void
    {
        User::factory()->create([
            'email' => 'staff@example.com',
            'password' => Hash::make('correct-password'),
        ]);

        $this->post(route('login.store'), [
            'email' => 'staff@example.com',
            'password' => 'incorrect-password',
        ])->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_google_only_account_cannot_login_with_a_password_until_one_is_set(): void
    {
        User::factory()->create([
            'email' => 'google-user@example.com',
            'google_id' => 'google-existing',
            'password' => null,
        ]);

        $this->post(route('login.store'), [
            'email' => 'google-user@example.com',
            'password' => 'any-password',
        ])->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_registration_creates_and_authenticates_a_petugas_even_if_admin_role_is_submitted(): void
    {
        $this->post(route('register.store'), [
            'name' => 'New Staff',
            'email' => 'Staff@Example.com',
            'password' => 'staff-password',
            'password_confirmation' => 'staff-password',
            'role' => User::ROLE_ADMIN,
        ])->assertRedirect(route('rooms.index'));

        $this->assertAuthenticated();
        $user = User::query()->where('email', 'staff@example.com')->firstOrFail();
        $this->assertSame(User::ROLE_PETUGAS, $user->role);
        $this->assertTrue(Hash::check('staff-password', $user->password));
    }

    public function test_registration_cannot_take_over_an_existing_google_only_account(): void
    {
        $existingUser = User::factory()->create([
            'email' => 'linked@example.com',
            'google_id' => 'google-linked',
            'password' => null,
        ]);

        $this->post(route('register.store'), [
            'name' => 'Attacker',
            'email' => 'linked@example.com',
            'password' => 'attacker-password',
            'password_confirmation' => 'attacker-password',
        ])->assertSessionHasErrors('email');

        $this->assertGuest();
        $this->assertDatabaseHas('users', [
            'id' => $existingUser->id,
            'google_id' => 'google-linked',
            'password' => null,
        ]);
    }

    public function test_registration_requires_a_confirmed_minimum_length_password(): void
    {
        $this->post(route('register.store'), [
            'name' => 'New Staff',
            'email' => 'staff@example.com',
            'password' => 'short',
            'password_confirmation' => 'different',
        ])->assertSessionHasErrors(['password']);

        $this->assertGuest();
        $this->assertDatabaseMissing('users', ['email' => 'staff@example.com']);
    }

    public function test_login_is_rate_limited_after_five_failed_attempts(): void
    {
        $credentials = [
            'email' => 'missing@example.com',
            'password' => 'incorrect-password',
        ];

        foreach (range(1, 5) as $attempt) {
            $this->post(route('login.store'), $credentials)->assertSessionHasErrors('email');
        }

        $this->post(route('login.store'), $credentials)->assertTooManyRequests();
    }
}
