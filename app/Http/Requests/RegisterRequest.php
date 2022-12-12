<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Contracts\Validation\Validator as Validator;
use Illuminate\Validation\ValidationException;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => ['required', 'min:8', Password::defaults()->numbers()->mixedCase()],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Név megadása kötelező!',
            'name.max' => 'Név maximum 255 karakter hosszúságú!',
            'email.required' => 'Email megadása kötelező!',
            'email.email' => 'Helytelen Email!',
            'email.max' => 'Emmail maximum 255 karakter hosszúságú!',
            'password.required' => 'Jelszó megadása kötelező!',
            'password.min' => 'Jelszó legalább 8 karakter hosszúságú!',
            'password' => 'Helytelen jelszó!',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
