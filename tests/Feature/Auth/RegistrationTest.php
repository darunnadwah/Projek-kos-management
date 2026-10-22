<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_register_as_tenants_and_see_their_account_on_dashboard(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'role' => 'superadmin',
        ]);

        $user = User::where('email', 'test@example.com')->firstOrFail();

        $this->assertModelExists($user);
        $this->assertSame('user', $user->role);
        $this->assertTrue(Hash::check('password', $user->password));
        $this->assertAuthenticatedAs($user);
        $response->assertRedirect(route('dashboard', absolute: false));

        $this->get(route('dashboard'))->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard')
            ->where('auth.user.id', $user->id)
            ->where('auth.user.name', 'Test User')
            ->where('auth.user.role', 'user')
            ->where('stats.totalRentals', 0)
            ->missing('stats.totalTenants'));
    }
}
