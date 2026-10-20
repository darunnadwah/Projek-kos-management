<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRentalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
        'user_id'        => ['required', 'exists:users,id'],
        'room_id'        => ['required', 'exists:rooms,id'],
        'start_date'     => ['required', 'date'],
        'end_date'       => ['required', 'date', 'after_or_equal:start_date'],
        'total_price'    => ['required', 'numeric'],
        'status'         => ['required', 'in:active,pending,completed,cancelled'],
        'payment_status' => ['required', 'in:pending,verified'],
        ];
    }
}