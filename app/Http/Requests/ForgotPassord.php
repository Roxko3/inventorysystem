<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\PasswordMixedCase;
use App\Rules\PasswordNumber;
use Illuminate\Contracts\Validation\Validator as Validator;
use Illuminate\Validation\ValidationException;


class ForgotPassord extends FormRequest
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
            'email' => 'required|string|email|max:255|exists:users',
        ];
    }
    public function messages()
    {
        return [
            
            'email.required' => 'Email megadása kötelező.',
            'email.email' => 'Helytelen Email.',
            'email.max' => 'Az email maximum 255 karakter hosszúságú.',
            'email.exists' => 'A megadott email nem létezik a redszerben.',
          
        ];
    }
    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
