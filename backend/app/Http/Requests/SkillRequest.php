<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SkillRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $required = $this->isMethod('post') ? 'required' : 'sometimes|required';

        return [
            'is_published' => 'sometimes|boolean',
            'name' => "$required|string|max:100",
            'category' => "$required|in:frontend,backend,database,devops",
            'experience' => "$required|in:practice,academic,learning",
            'icon' => 'nullable|string|max:100',
        ];
    }

    protected function prepareForValidation(): void
    {
        foreach (['name', 'icon'] as $field) {
            if (is_string($this->input($field))) {
                $this->merge([$field => trim(strip_tags($this->input($field)))]);
            }
        }
    }
}
