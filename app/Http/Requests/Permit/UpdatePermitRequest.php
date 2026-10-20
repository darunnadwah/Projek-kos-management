<?php

namespace App\Http\Requests\Permit;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePermitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'status'      => 'required|in:pending,approved,rejected',
        ];
    }
}
