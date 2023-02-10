<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class NameEmailRequest extends FormRequest
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
            'name' => "required|max:255",
            'email' => "required|email|max:255",
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
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
