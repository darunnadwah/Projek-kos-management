<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Rental extends Model
{
    use HasUuids;
    protected $fillable = [
        'user_id',
        'room_id',
        'add_ons',
        'total_price',
        'payment_status',
    ];

    protected $casts = [
        'add_ons' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }
}