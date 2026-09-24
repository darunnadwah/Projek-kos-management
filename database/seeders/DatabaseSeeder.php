<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
    foreach (['superadmin', 'admin', 'pemilik'] as $role) {
    User::factory()->create(['name' => ucfirst($role), 'email' => "$role@example.com", 'role' => $role]);
    }

    foreach (range(1, 5) as $n) {
        Room::create(['room_number' => "A0$n", 'base_price' => 800000]);
    }
    }
}
