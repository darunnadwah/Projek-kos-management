<?php

namespace Tests\Feature;

use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class RoomCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_room_resource_pages_are_available(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $room = Room::create([
            'room_number' => 'A01',
            'status' => 'available',
            'base_price' => 800000,
        ]);

        $this->get('/')->assertOk()->assertSee(route('rooms.index'));
        $this->get(route('rooms.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard/Rooms/Index')
                ->where('can.create', true)
                ->where('can.update', true)
                ->where('can.delete', true)
                ->has('rooms.data', 1)
                ->where('rooms.data.0.room_number', 'A01'));
        $this->get(route('rooms.create'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard/Rooms/Create'));
        $this->get(route('rooms.show', $room))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard/Rooms/Show')
                ->where('can.update', true)
                ->where('can.delete', true)
                ->where('room.room_number', 'A01')
                ->where('room.base_price', 800000));
        $this->get(route('rooms.edit', $room))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard/Rooms/Edit')
                ->where('room.room_number', 'A01'));
    }

    public function test_room_list_paginates_when_more_than_ten_rooms_exist(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        foreach (range(1, 12) as $number) {
            Room::create([
                'room_number' => sprintf('R%02d', $number),
                'status' => 'available',
                'base_price' => 800000,
            ]);
        }

        $this->get(route('rooms.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->has('rooms.data', 10)
                ->has('rooms.links', 4)
                ->where('rooms.data.9.room_number', 'R10'));
        $this->get(route('rooms.index', ['page' => 2]))
            ->assertInertia(fn (Assert $page) => $page
                ->has('rooms.data', 2)
                ->where('rooms.current_page', 2)
                ->where('rooms.data.0.room_number', 'R11'));
    }

    public function test_room_can_be_created_updated_and_deleted_with_flash_messages(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $this->from(route('rooms.create'))
            ->post(route('rooms.store'), [
                'room_number' => 'B12',
                'status' => 'available',
                'base_price' => 950000,
            ])
            ->assertRedirect(route('rooms.index'))
            ->assertSessionHas('success', 'Kamar berhasil ditambahkan.');

        $room = Room::where('room_number', 'B12')->firstOrFail();
        $this->assertSame(950000, $room->base_price);
        $this->get(route('rooms.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard/Rooms/Index')
                ->where('flash.success', 'Kamar berhasil ditambahkan.'));

        $this->from(route('rooms.edit', $room))
            ->put(route('rooms.update', $room), [
                'room_number' => 'B12',
                'status' => 'occupied',
                'base_price' => 1000000,
            ])
            ->assertRedirect(route('rooms.index'))
            ->assertSessionHas('success', 'Data kamar berhasil diperbarui.');

        $room->refresh();
        $this->assertSame('occupied', $room->status);
        $this->assertSame(1000000, $room->base_price);
        $this->get(route('rooms.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard/Rooms/Index')
                ->where('flash.success', 'Data kamar berhasil diperbarui.'));

        $this->delete(route('rooms.destroy', $room))
            ->assertRedirect(route('rooms.index'))
            ->assertSessionHas('success', 'Kamar berhasil dihapus.');
        $this->assertDatabaseMissing('rooms', ['id' => $room->id]);
    }

    public function test_invalid_room_input_returns_to_form_with_errors_and_old_input(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $response = $this->from(route('rooms.create'))
            ->post(route('rooms.store'), [
                'room_number' => '',
                'status' => 'unknown',
                'base_price' => -1,
            ]);

        $response
            ->assertRedirect(route('rooms.create'))
            ->assertSessionHasErrors([
                'room_number' => 'Nomor kamar wajib diisi.',
                'status' => 'Pilih status kamar yang tersedia.',
                'base_price' => 'Harga dasar tidak boleh kurang dari 0.',
            ])
            ->assertSessionHas('_old_input.room_number', '');

        $this->assertDatabaseCount('rooms', 0);
    }

    public function test_non_integer_room_price_is_rejected_with_a_message(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $this->from(route('rooms.create'))
            ->post(route('rooms.store'), [
                'room_number' => 'C03',
                'status' => 'available',
                'base_price' => 'not-a-number',
            ])
            ->assertSessionHasErrors([
                'base_price' => 'Harga dasar harus berupa angka bulat.',
            ]);

        $this->assertDatabaseCount('rooms', 0);
    }

    public function test_room_price_above_unsigned_integer_limit_is_rejected(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $this->from(route('rooms.create'))
            ->post(route('rooms.store'), [
                'room_number' => 'C04',
                'status' => 'available',
                'base_price' => '4294967296',
            ])
            ->assertSessionHasErrors([
                'base_price' => 'Harga dasar tidak boleh lebih dari Rp 4.294.967.295.',
            ]);

        $this->assertDatabaseCount('rooms', 0);
    }

    public function test_room_number_must_be_unique_when_creating_or_updating(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $firstRoom = Room::create([
            'room_number' => 'A01',
            'status' => 'available',
            'base_price' => 800000,
        ]);
        $secondRoom = Room::create([
            'room_number' => 'A02',
            'status' => 'available',
            'base_price' => 800000,
        ]);

        $this->from(route('rooms.create'))
            ->post(route('rooms.store'), [
                'room_number' => 'A01',
                'status' => 'available',
                'base_price' => 800000,
            ])
            ->assertSessionHasErrors('room_number');

        $this->from(route('rooms.edit', $secondRoom))
            ->put(route('rooms.update', $secondRoom), [
                'room_number' => $firstRoom->room_number,
                'status' => 'available',
                'base_price' => 800000,
            ])
            ->assertSessionHasErrors('room_number');
    }

    public static function invalidRoomUpdateCases(): array
    {
        return [
            'unsupported status' => [
                ['status' => 'reserved'],
                'status',
                'Pilih status kamar yang tersedia.',
            ],
            'fractional price' => [
                ['base_price' => '800000.50'],
                'base_price',
                'Harga dasar harus berupa angka bulat.',
            ],
            'negative price' => [
                ['base_price' => -1],
                'base_price',
                'Harga dasar tidak boleh kurang dari 0.',
            ],
            'price above database range' => [
                ['base_price' => '4294967296'],
                'base_price',
                'Harga dasar tidak boleh lebih dari Rp 4.294.967.295.',
            ],
        ];
    }

    #[DataProvider('invalidRoomUpdateCases')]
    public function test_room_update_rejects_invalid_status_and_price(
        array $overrides,
        string $field,
        string $message,
    ): void {
        $this->actingAs(User::factory()->admin()->create());

        $room = Room::create([
            'room_number' => 'D01',
            'status' => 'available',
            'base_price' => 800000,
        ]);

        $response = $this->from(route('rooms.edit', $room))
            ->put(route('rooms.update', $room), array_merge([
                'room_number' => $room->room_number,
                'status' => 'occupied',
                'base_price' => 900000,
            ], $overrides));

        $response->assertSessionHasErrors([$field => $message]);
        $this->assertSame('available', $room->refresh()->status);
        $this->assertSame(800000, $room->base_price);
    }
}
