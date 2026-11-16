<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'is_published' => 'sometimes|boolean',
            'title' => [$this->isMethod('post') ? 'required' : 'sometimes', 'required', 'string', 'max:200'],
            'short_desc' => 'nullable|string|max:300', 'description' => 'nullable|string|max:10000',
            'category' => 'nullable|string|max:100', 'status' => 'nullable|string|max:50',
            'tech' => 'nullable|array|max:30', 'tech.*' => 'string|max:50',
            'live_url' => 'nullable|url:http,https|max:255', 'github_url' => 'nullable|url:http,https|max:255',
            'year' => 'nullable|integer|min:2000|max:2100', 'featured' => 'boolean',
            'display_order' => 'sometimes|integer|min:0|max:10000',
            'period' => 'nullable|string|max:255', 'participation' => 'nullable|string|max:255',
            'achievements' => 'nullable|array|max:20', 'achievements.*' => 'string|max:500',
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
