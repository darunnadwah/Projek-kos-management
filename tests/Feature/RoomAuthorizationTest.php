<?php

namespace Tests\Feature;

use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Gate;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class RoomAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_redirected_to_login_before_viewing_rooms(): void
    {
        $this->get(route('rooms.index'))
            ->assertRedirect(route('login'));
    }

    public function test_room_policy_allows_admin_crud_and_petugas_read_only(): void
    {
        $admin = User::factory()->admin()->create();
        $petugas = User::factory()->petugas()->create();
        $room = Room::create([
            'room_number' => 'A01',
            'status' => 'available',
            'base_price' => 800000,
        ]);

        $this->assertTrue(Gate::forUser($admin)->allows('viewAny', Room::class));
        $this->assertTrue(Gate::forUser($admin)->allows('view', $room));
        $this->assertTrue(Gate::forUser($admin)->allows('create', Room::class));
        $this->assertTrue(Gate::forUser($admin)->allows('update', $room));
        $this->assertTrue(Gate::forUser($admin)->allows('delete', $room));

        $this->assertTrue(Gate::forUser($petugas)->allows('viewAny', Room::class));
        $this->assertTrue(Gate::forUser($petugas)->allows('view', $room));
        $this->assertFalse(Gate::forUser($petugas)->allows('create', Room::class));
        $this->assertFalse(Gate::forUser($petugas)->allows('update', $room));
        $this->assertFalse(Gate::forUser($petugas)->allows('delete', $room));
    }

    public function test_petugas_can_view_rooms_and_receives_false_mutation_capabilities(): void
    {
        $petugas = User::factory()->petugas()->create();
        $room = Room::create([
            'room_number' => 'A01',
            'status' => 'available',
            'base_price' => 800000,
        ]);

        $this->actingAs($petugas)
            ->get(route('rooms.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard/Rooms/Index')
                ->where('can.create', false)
                ->where('can.update', false)
                ->where('can.delete', false)
                ->where('auth.user.role', User::ROLE_PETUGAS)
                ->missing('auth.user.google_id'));

        $this->get(route('rooms.show', $room))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard/Rooms/Show')
                ->where('can.update', false)
                ->where('can.delete', false));
    }

    public function test_petugas_is_forbidden_from_room_mutations_and_records_remain_unchanged(): void
    {
        $petugas = User::factory()->petugas()->create();
        $room = Room::create([
            'room_number' => 'A01',
            'status' => 'available',
            'base_price' => 800000,
        ]);

        $this->actingAs($petugas);

        $this->get(route('rooms.create'))->assertForbidden();
        $this->get(route('rooms.edit', $room))->assertForbidden();
        $this->post(route('rooms.store'), [])->assertForbidden();
        $this->put(route('rooms.update', $room), [
            'room_number' => 'A01',
            'status' => 'occupied',
            'base_price' => 1000000,
        ])->assertForbidden();
        $this->delete(route('rooms.destroy', $room))->assertForbidden();

        $this->assertDatabaseHas('rooms', [
            'id' => $room->id,
            'room_number' => 'A01',
            'status' => 'available',
            'base_price' => 800000,
        ]);
        $this->assertDatabaseMissing('rooms', ['room_number' => 'B02']);
    }

    public function test_users_with_roles_outside_the_staff_roles_are_forbidden(): void
    {
        $legacyUser = User::factory()->create(['role' => 'unrecognized']);

        $this->actingAs($legacyUser)
            ->get(route('rooms.index'))
            ->assertForbidden();
    }

    public function test_role_is_not_mass_assignable_from_user_input(): void
    {
        $petugas = User::factory()->petugas()->create();

        $petugas->fill(['role' => User::ROLE_ADMIN]);
        $petugas->save();

        $this->assertSame(User::ROLE_PETUGAS, $petugas->refresh()->role);
    }

    public function test_legacy_role_migration_preserves_admin_and_maps_other_roles_to_petugas(): void
    {
        $users = collect(['admin', 'superadmin', 'pemilik', 'pengekos'])
            ->map(fn (string $role): User => User::factory()->create(['role' => $role]));

        $migration = require database_path(
            'migrations/2026_10_19_053033_normalize_legacy_user_roles_for_staff_access.php',
        );
        $migration->up();

        $this->assertDatabaseHas('users', [
            'id' => $users[0]->id,
            'role' => User::ROLE_ADMIN,
        ]);
        foreach ($users->skip(1) as $user) {
            $this->assertDatabaseHas('users', [
                'id' => $user->id,
                'role' => User::ROLE_PETUGAS,
            ]);
        }
    }
}
