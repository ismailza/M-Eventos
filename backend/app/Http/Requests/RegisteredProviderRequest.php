<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisteredProviderRequest extends FormRequest
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
            'firstname' => 'required|string|min:3|max:20',
            'lastname' => 'required|string|min:3|max:20',
            'birth_date' => 'required|date',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'address' => 'required|string|min:3|max:60',
            'phone_number' => 'required|string|min:10|max:15',
            'username' => 'required|string|min:3|max:20|unique:providers',
            'email' => 'required|string|email|max:50|unique:providers',
            'password' => 'required|confirmed|min:8|max:100,Rules\Password::defaults()',
        ];
    }
}
