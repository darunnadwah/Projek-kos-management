<?php

namespace Database\Seeders;

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Room;
use App\Models\Rental;
use App\Models\Permit;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Buat Akun Pengguna untuk Setiap Role
        $superadmin = User::create([
            'name'     => 'Super Admin Kost',
            'email'    => 'superadmin@gmail.com',
            'password' => Hash::make('password'),
            'role'     => 'superadmin',
        ]);

        $admin = User::create([
            'name'     => 'Pengelola Kost (Admin)',
            'email'    => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        $user1 = User::create([
            'name'     => 'Hanzuel Akbar',
            'email'    => 'user@gmail.com',
            'password' => Hash::make('password'),
            'role'     => 'user',
        ]);

        // 2. Buat Data Kamar Dummy
        $room1 = Room::create([
            'room_number' => 'Kamar 101',
            'description' => 'Fasilitas: AC, Kamar Mandi Dalam, Kasur Springbed, Meja Belajar, WiFi 100Mbps.',
            'price'       => 1500000.00,
            'status'      => 'occupied',
        ]);

        $room2 = Room::create([
            'room_number' => 'Kamar 102',
            'description' => 'Fasilitas: AC, Kamar Mandi Dalam, Lemari Pakaian, WiFi 100Mbps.',
            'price'       => 1400000.00,
            'status'      => 'available',
        ]);

        $room3 = Room::create([
            'room_number' => 'Kamar 201',
            'description' => 'Fasilitas: Kipas Angin, Kamar Mandi Luar, Kasur Single, Meja Belajar.',
            'price'       => 850000.00,
            'status'      => 'available',
        ]);

        // 3. Buat Data Penyewaan Dummy (Agar langsung kelihatan di Dashboard)
        Rental::create([
            'user_id'    => $user1->id,
            'room_id'    => $room1->id,
            'start_date' => now()->format('Y-m-d'),
            'end_date'   => now()->addMonths(6)->format('Y-m-d'),
            'status'     => 'approved',
        ]);

        // 4. Buat Data Perizinan Dummy
        Permit::create([
            'user_id'     => $user1->id,
            'title'       => 'Izin Membawa Tamu Menginap',
            'description' => 'Mengajukan izin menginapkan saudara laki-laki selama 2 hari (Sabtu-Minggu).',
            'status'      => 'pending',
        ]);
    }
}
