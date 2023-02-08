<?php

namespace App\Http\Requests;

use App\Rules\PasswordMixedCaseRule;
use App\Rules\PasswordNumberRule;
use Illuminate\Foundation\Http\FormRequest;
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
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => ['required', 'min:8', 'max:255', new PasswordMixedCaseRule, new PasswordNumberRule],
            'password_repeat' => 'required|same:password'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Név megadása kötelező!',
            'name.max' => 'Név maximum 255 karakter hosszúságú!',
            'email.required' => 'Email megadása kötelező!',
            'email.email' => 'Helytelen email!',
            'email.max' => 'Az email maximum 255 karakter hosszúságú!',
            'email.unique' => 'A megadott email már használt!',
            'password.required' => 'Jelszó megadása kötelező!',
            'password.min' => 'Jelszó legalább 8 karakter hosszúságú!',
            'password.max' => 'Jelszó maximum 255 karakter hosszúságú!',
            'password_repeat.required' => 'Jelszó ismétlés megadása kötelező!',
            'password_repeat.same' => 'Jelszó ismétlés nem eggyezik!'
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
