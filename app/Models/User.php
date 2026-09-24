<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'google_id',
        'role',
    ];

    public function rentals(): HasMany
    {
        return $this->hasMany(Rental::class);
    }

    public function permissions(): HasMany
    {
        return $this->hasMany(Permission::class);
    }
}