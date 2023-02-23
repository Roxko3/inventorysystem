<?php

namespace App\Http\Requests;

use App\Rules\PasswordMixedCase;
use App\Rules\PasswordNumber;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use Illuminate\Contracts\Validation\Validator as Validator;
use Illuminate\Validation\ValidationException;

class PasswordReset extends FormRequest
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
            'token' => 'required',
            'password' => ['required', 'min:8', new PasswordMixedCase, new PasswordNumber],
            'password-repeat' => 'required|same:password'
        ];
    }
    public function messages()
    {
        return [
            'token.required' => 'Token megadása kötelező.',
            'password.required' => 'Jelszó megadása kötelező.',
            'password.min' => 'Jelszó legalább 8 karakter hosszúságú.',
            'password-repeat.required' => 'Jelszó ismétlés megadása kötelező.',
            'password-repeat.same' => 'Jelszó ismétlés nem eggyezik.'
          
        ];
    }
    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
