<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator as Validator;
use Illuminate\Validation\ValidationException;

class ShopRequest extends FormRequest
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
            'shop_type_id' => "required|numeric|exists:shop_types,id",
            'address' => "required|max:255",
            'owner' => "required|max:255",
            'city' => "required|max:255",
        ];
    }

    public function messages()
    {
        return [
            'name.required' => "Név megadása kötelező!",
            'name.max' => "Név maximum 255 karakter hosszúságú!",
            'shop_type_id.required' => "Bolt típus megadása kötelező!",
            'shop_type_id.numeric' => "A bolt típus csak szám lehet!",
            'shop_type_id.exists' => "A megadott bolt típus nem létezik!",
            'address.required' => "Cím megadása kötelező!",
            'address.max' => "Cím maximum 255 karakter hosszúságú!",
            'owner.required' => "Tulajdonos megadása kötelező!",
            'owner.max' => "Tulajdonos maximum 255 karakter hosszúságú!",
            'city.required' => "Város megadása kötelező!",
            'city.max' => "A város maximum 255 karakter hosszú!",
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
