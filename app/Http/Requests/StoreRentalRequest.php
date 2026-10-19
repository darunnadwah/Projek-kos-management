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
            'user_id' => ['required', 'uuid', 'exists:users,id'],
            'room_id' => ['required', 'uuid', 'exists:rooms,id'],
            'add_ons' => ['nullable', 'array'], 
            'total_price' => ['required', 'integer', 'min:0'],
            'payment_status' => ['nullable', 'in:pending,verified'],
        ];
    }
}