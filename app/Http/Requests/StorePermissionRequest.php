<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePermissionRequest extends FormRequest
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
            'status' => ['nullable', 'in:pending,approved,rejected'], 
        ];
    }
}