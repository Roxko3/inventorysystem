<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator as Validator;
use Illuminate\Validation\ValidationException;

class EmailVerifyTokenRequest extends FormRequest

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
            'tokenEmail' => 'required|exists:tokens,tokenEmail',
        ];
    }
    public function messages()
    {
        return [
            'tokenEmail.required' => 'Token megadása kötelező.',
            'tokenEmail.exists' => 'A megadott token nem létezik a redszerben.',
          
        ];
    }
    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
