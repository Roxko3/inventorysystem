<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class PostalCodeRequest extends FormRequest
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
            'postal_code' => "required|numeric|min:1000|max:9999",
        ];
    }

    public function messages()
    {
        return [
            'postal_code.required' => "Irányítószám megadása kötelező!",
            'postal_code.numeric' => "Az irányítószám csak szám lehet!",
            'postal_code.min' => "Az irányítószám 1000 és 9999 közötti szám!",
            'postal_code.max' => "Az irányítószám 1000 és 9999 közötti szám!",
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
