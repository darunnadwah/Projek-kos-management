<?php

namespace Tests\Feature;

use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoomCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_room_resource_pages_are_available(): void
    {
        $room = Room::create([
            'room_number' => 'A01',
            'status' => 'available',
            'base_price' => 800000,
        ]);

        $this->get('/')->assertOk()->assertSee(route('rooms.index'));
        $this->get(route('rooms.index'))->assertOk()->assertSee('A01');
        $this->get(route('rooms.create'))->assertOk()->assertSee('Tambah kamar');
        $this->get(route('rooms.show', $room))->assertOk()->assertSee('Rp 800.000');
        $this->get(route('rooms.edit', $room))->assertOk()->assertSee('Ubah kamar A01');
    }

    public function test_room_can_be_created_updated_and_deleted_with_flash_messages(): void
    {
        $this->from(route('rooms.create'))
            ->post(route('rooms.store'), [
                'room_number' => 'B12',
                'status' => 'available',
                'base_price' => 950000,
            ])
            ->assertRedirect();

        $room = Room::where('room_number', 'B12')->firstOrFail();
        $this->assertSame(950000, $room->base_price);
        $this->get(route('rooms.show', $room))->assertOk()->assertSee('Kamar berhasil ditambahkan.');

        $this->from(route('rooms.edit', $room))
            ->put(route('rooms.update', $room), [
                'room_number' => 'B12',
                'status' => 'occupied',
                'base_price' => 1000000,
            ])
            ->assertRedirect();

        $room->refresh();
        $this->assertSame('occupied', $room->status);
        $this->assertSame(1000000, $room->base_price);
        $this->get(route('rooms.show', $room))->assertOk()->assertSee('Data kamar berhasil diperbarui.');

        $this->delete(route('rooms.destroy', $room))
            ->assertRedirect(route('rooms.index'))
            ->assertSessionHas('success', 'Kamar berhasil dihapus.');
        $this->assertDatabaseMissing('rooms', ['id' => $room->id]);
    }

    public function test_invalid_room_input_returns_to_form_with_errors_and_old_input(): void
    {
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
}
