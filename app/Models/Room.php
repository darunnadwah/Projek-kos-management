<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    protected $fillable = [
        'room_number',
        'status',
        'base_price',
    ];

    public function rentals(): HasMany
    {
        return $this->hasMany(Rental::class);
    }
}