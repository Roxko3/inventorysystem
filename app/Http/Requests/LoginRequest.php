<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator as Validator;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
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
            'email' => "required|email|max:255",
            'password' => "required|max:255"
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Email megadása kötelező!',
            'email.email' => 'Helytelen email!',
            'email.max' => 'Email maximum 255 karakter hosszúságú!',
            'password.required' => 'Jelszó megadása kötelező!',
            'password.max' => 'Jelszó maximum 255 karakter hosszúságú!',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
