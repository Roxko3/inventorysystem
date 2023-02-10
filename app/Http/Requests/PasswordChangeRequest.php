<?php

namespace App\Http\Requests;

use App\Rules\PasswordMixedCaseRule;
use App\Rules\PasswordNumberRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator as Validator;
use Illuminate\Validation\ValidationException;

class PasswordChangeRequest extends FormRequest
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
            'old-password' => 'required',
            'new-password' => ['required', 'min:8', 'max:255', new PasswordMixedCaseRule, new PasswordNumberRule],
            'new-password-repeat' => 'required|same:new-password'
        ];
    }

    public function messages()
    {
        return [
            'old-password.required' => 'Régi jelszó megadása kötelező!',
            'new-password.required' => 'Új jelszó megadása kötelező!',
            'new-password.min' => 'Jelszó legalább 8 karakter hosszúságú!',
            'new-password.max' => 'Jelszó maximum 255 karakter hosszúságú!',
            'new-password-repeat.required' => 'Jelszó ismétlés megadása kötelező!',
            'password-repeat.same' => 'Jelszó ismétlés nem eggyezik!'
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
