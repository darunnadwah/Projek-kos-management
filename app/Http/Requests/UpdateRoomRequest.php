<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'room_number' => [
                'required',
                'string',
                Rule::unique('rooms', 'room_number')->ignore($this->route('room')),
            ],
            'status'     => ['required', 'string'],
            'base_price' => ['required', 'numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'room_number.required' => 'Nomor kamar wajib diisi.',
            'room_number.unique' => 'Nomor kamar ini sudah digunakan.',
            'status.required' => 'Status kamar wajib dipilih.',
            'status.in' => 'Pilih status kamar yang tersedia.',
            'base_price.required' => 'Harga dasar wajib diisi.',
            'base_price.integer' => 'Harga dasar harus berupa angka bulat.',
            'base_price.min' => 'Harga dasar tidak boleh kurang dari 0.',
            'base_price.max' => 'Harga dasar tidak boleh lebih dari Rp 4.294.967.295.',
        ];
    }
}