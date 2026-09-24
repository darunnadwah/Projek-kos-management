<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Room extends Model
{
    use HasUuids;
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