<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'is_published' => 'sometimes|boolean',
            'title' => ($this->isMethod('post') ? 'required' : 'sometimes|required').'|string|max:150',
            'description' => 'nullable|string|max:5000', 'icon' => 'nullable|string|max:50',
            'price' => 'nullable|string|max:100', 'features' => 'nullable|array|max:20',
            'features.*' => 'string|max:200', 'popular' => 'boolean',
        ];
    }

    protected function prepareForValidation(): void
    {
        $values = $this->all();
        array_walk_recursive($values, function (&$value) {
            if (is_string($value)) {
                $value = trim(strip_tags($value));
            }
        });
        $this->merge($values);
    }
}
