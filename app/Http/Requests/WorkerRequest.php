<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class WorkerRequest extends FormRequest
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
            'email' => "required|exists:users,email",
            'permission' => "required|numeric|min:1|max:10",
        ];
    }

    public function messages()
    {
        return [
            'email.required' => "Email megadása kötelező!",
            'email.exists' => "Nem található felhasználó a megadott email címmel!",
            'permission.numeric' => "A hozzáférés csak szám lehet!",
            'permission.min' => "Hozzáférés minimum értéke 0!",
            'permission.max' => "Hozzáférés maximum értéke 10!",
            'permission.required' => "Hozzáférés megadása kötelező!",
        ];
    }


    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
