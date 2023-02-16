<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator as Validator;
use Illuminate\Validation\ValidationException;

class RatingRequest extends FormRequest
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
            'rating' => 'required|numeric|min:0|max:5',
        ];
    }

    public function messages()
    {
        return [
            'rating.required' => 'Értékelés megadása kötelező!',
            'rating.numeric' => 'Az értékelés csak szám lehet!',
            'rating.min' => 'Az értékelés értéke minimum 1!',
            'rating.max' => 'Az értékelés értéke maximum 5!',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
