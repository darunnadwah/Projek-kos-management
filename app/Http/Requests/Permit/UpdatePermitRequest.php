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
            'status'      => 'required|in:pending,approved,rejected',
        ];
    }
}
