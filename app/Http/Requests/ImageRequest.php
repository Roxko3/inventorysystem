<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator as Validator;
use Illuminate\Validation\ValidationException;

class ImageRequest extends FormRequest
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
            'image' => "required|mimes:jpg,png,jpeg|max:5048",
        ];
    }

    public function messages()
    {
        return [
            'image.required' => 'Nem adott meg képet!',
            'image.mimes' => 'A fájl kiterjesztése nem megfelelő!',
            'image.max' => 'A maximális fájlméret 5 MB!',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
