<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3|max:40',
            'description' => 'nullable|string|min:10',
            'price' => 'required|numeric',
            'medias' => 'required|array',
            'medias.*' => 'required|mimes:jpg,jpeg,png,svg,mp4|max:20000',
            'options' => 'required|array',
            'options.*' => 'required|exists:options,id',
        ];
    }
}
