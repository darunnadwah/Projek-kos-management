<?php

namespace App\Http\Requests\Rental;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRentalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return in_array($this->user()?->role, ['user', 'superadmin'], true);
    }

    public function rules(): array
    {
        return [
            'room_id'    => ['required', Rule::exists('rooms', 'id')->where('status', 'available')],
            'start_date' => 'required|date',
            'end_date'   => 'nullable|date|after_or_equal:start_date',
        ];
    }
}
