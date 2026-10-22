<?php

namespace Tests\Feature;

use App\Models\Permit;
use App\Models\Rental;
use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_tenants_only_see_their_own_rentals_and_permits(): void
    {
        $tenant = User::factory()->create(['role' => 'user']);
        $otherTenant = User::factory()->create(['role' => 'user']);
        $room = $this->createRoom();
        $ownRental = Rental::create([
            'user_id' => $tenant->id,
            'room_id' => $room->id,
            'start_date' => now()->toDateString(),
        ]);
        Rental::create([
            'user_id' => $otherTenant->id,
            'room_id' => $room->id,
            'start_date' => now()->toDateString(),
        ]);
        $ownPermit = Permit::create([
            'user_id' => $tenant->id,
            'title' => 'Izin tenant',
            'description' => 'Permohonan tenant',
        ]);
        Permit::create([
            'user_id' => $otherTenant->id,
            'title' => 'Izin lain',
            'description' => 'Permohonan pengguna lain',
        ]);

        $this->actingAs($tenant)
            ->get(route('rentals.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Rentals/Index')
                ->has('rentals', 1)
                ->where('rentals.0.id', $ownRental->id));

        $this->actingAs($tenant)
            ->get(route('permits.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Permits/Index')
                ->has('permits', 1)
                ->where('permits.0.id', $ownPermit->id));
    }

    public function test_tenant_can_browse_available_rooms_and_preselect_a_room_to_rent(): void
    {
        $tenant = User::factory()->create(['role' => 'user']);
        $availableRoom = $this->createRoom();
        Room::create([
            'room_number' => 'Occupied room',
            'description' => 'Already rented',
            'price' => 1200000,
            'status' => 'occupied',
        ]);

        $this->actingAs($tenant)
            ->get(route('rentals.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Rentals/Index')
                ->has('availableRooms', 1)
                ->where('availableRooms.0.id', $availableRoom->id));

        $this->actingAs($tenant)
            ->get(route('rentals.create', ['room' => $availableRoom->id]))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Rentals/Create')
                ->has('rooms', 1)
                ->where('selectedRoomId', $availableRoom->id));
    }

    public function test_tenants_cannot_manage_rooms_rentals_permits_or_users(): void
    {
        $tenant = User::factory()->create(['role' => 'user']);
        $permit = Permit::create([
            'user_id' => $tenant->id,
            'title' => 'Izin tenant',
            'description' => 'Permohonan tenant',
        ]);
        $rental = Rental::create([
            'user_id' => $tenant->id,
            'room_id' => $this->createRoom()->id,
            'start_date' => now()->toDateString(),
        ]);

        $this->actingAs($tenant)->get(route('rooms.index'))->assertForbidden();
        $this->actingAs($tenant)->put(route('rentals.update', $rental), ['status' => 'approved'])->assertForbidden();
        $this->actingAs($tenant)->put(route('permits.update', $permit), ['status' => 'approved'])->assertForbidden();
        $this->actingAs($tenant)->get(route('users.index'))->assertForbidden();
    }

    public function test_admin_can_manage_requests_but_cannot_manage_users(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $tenant = User::factory()->create(['role' => 'user']);
        $rental = Rental::create([
            'user_id' => $tenant->id,
            'room_id' => $this->createRoom()->id,
            'start_date' => now()->toDateString(),
        ]);
        $permit = Permit::create([
            'user_id' => $tenant->id,
            'title' => 'Izin',
            'description' => 'Permohonan',
        ]);
        $approvedPermit = Permit::create([
            'user_id' => $tenant->id,
            'title' => 'Izin disetujui',
            'description' => 'Permohonan untuk disetujui',
        ]);

        $this->actingAs($admin)
            ->put(route('rentals.update', $rental), ['status' => 'approved'])
            ->assertRedirect(route('rentals.index'));
        $this->actingAs($admin)
            ->put(route('permits.update', $permit), ['status' => 'rejected'])
            ->assertRedirect(route('permits.index'));
        $this->actingAs($admin)
            ->put(route('permits.update', $approvedPermit), ['status' => 'approved'])
            ->assertRedirect(route('permits.index'));
        $this->actingAs($admin)->get(route('users.index'))->assertForbidden();

        $this->assertDatabaseHas('rentals', ['id' => $rental->id, 'status' => 'approved']);
        $this->assertDatabaseHas('permits', ['id' => $permit->id, 'status' => 'rejected']);
        $this->assertDatabaseHas('permits', ['id' => $approvedPermit->id, 'status' => 'approved']);
    }

    public function test_superadmin_can_open_user_management(): void
    {
        $superadmin = User::factory()->create(['role' => 'superadmin']);

        $this->actingAs($superadmin)
            ->get(route('users.index'))
            ->assertInertia(fn (Assert $page) => $page->component('Users/Index'));
    }

    public function test_tenant_requests_are_created_for_the_authenticated_user_as_pending(): void
    {
        $tenant = User::factory()->create(['role' => 'user']);
        $room = $this->createRoom();

        $this->actingAs($tenant)
            ->post(route('rentals.store'), [
                'room_id' => $room->id,
                'start_date' => now()->toDateString(),
                'status' => 'approved',
            ])
            ->assertRedirect(route('rentals.index'));

        $this->actingAs($tenant)
            ->post(route('permits.store'), [
                'title' => 'Izin keluar',
                'description' => 'Keperluan keluarga',
                'status' => 'approved',
            ])
            ->assertRedirect(route('permits.index'));

        $this->assertDatabaseHas('rentals', [
            'user_id' => $tenant->id,
            'room_id' => $room->id,
            'status' => 'pending',
        ]);
        $this->assertDatabaseHas('permits', [
            'user_id' => $tenant->id,
            'title' => 'Izin keluar',
            'status' => 'pending',
        ]);
    }

    public function test_superadmin_can_manage_users_without_demoting_the_current_account(): void
    {
        $superadmin = User::factory()->create(['role' => 'superadmin']);

        $this->actingAs($superadmin)
            ->post(route('users.store'), [
                'name' => 'Test Admin',
                'email' => 'new-admin@example.com',
                'role' => 'admin',
                'password' => 'test-password',
                'password_confirmation' => 'test-password',
            ])
            ->assertRedirect(route('users.index'));

        $createdUser = User::where('email', 'new-admin@example.com')->firstOrFail();
        $this->assertSame('admin', $createdUser->role);
        $this->assertTrue(Hash::check('test-password', $createdUser->password));

        $this->put(route('users.update', $superadmin), [
            'name' => $superadmin->name,
            'email' => $superadmin->email,
            'role' => 'user',
        ])->assertForbidden();
    }

    private function createRoom(): Room
    {
        return Room::create([
            'room_number' => 'Room '.uniqid(),
            'description' => 'Test room',
            'price' => 1000000,
            'status' => 'available',
        ]);
    }
}
