<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePermissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'uuid', 'exists:users,id'],
            'type' => ['required', 'in:izin_tamu,izin_kendaraan,komplain_fasilitas'],
            'description' => ['required', 'string'],
            'status' => ['required', 'in:pending,approved,rejected'], 
        ];
    }
}