<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_number',
        'description',
        'price',
        'status',
    ];

    // Relasi: Kamar bisa disewa beberapa kali (riwayat)
    public function rentals()
    {
        return $this->hasMany(Rental::class);
    }
}
