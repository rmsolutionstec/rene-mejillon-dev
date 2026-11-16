<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:150', 'email' => 'required|email|max:200',
            'subject' => 'nullable|string|max:200', 'service' => 'nullable|string|max:150',
            'message' => 'required|string|max:3000',
        ];
    }

    protected function prepareForValidation(): void
    {
        foreach (['name', 'email', 'subject', 'service', 'message'] as $field) {
            if (is_string($this->input($field))) {
                $this->merge([$field => trim(strip_tags($this->input($field)))]);
            }
        }
    }
}
