<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'google_id' => fake()->unique()->numerify('####################'),
            'role' => User::ROLE_PETUGAS,
        ];
    }

    public function admin(): static
    {
        return $this->state(fn (array $attributes): array => [
            'role' => User::ROLE_ADMIN,
        ]);
    }

    public function petugas(): static
    {
        return $this->state(fn (array $attributes): array => [
            'role' => User::ROLE_PETUGAS,
        ]);
    }
}
