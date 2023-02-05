<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator as Validator;
use Illuminate\Validation\ValidationException;

class StorageRequest extends FormRequest
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
            'product_id' => "required|numeric|exists:products,id",
            'amount' => "required|numeric|min:1|max:9999",
            'price' => "required|numeric|min:1|max:99999999",
            'expiration' => "date|date_format:Y-m-d H:i:s"
        ];
    }

    public function messages()
    {
        return [
            'product_id.required' => "Termék megadása kötelező!",
            'product_id.numeric' => "A termék csak szám lehet!",
            'product_id.exists' => "A megadott termék nem létezik!",
            'amount.required' => "Mennyiség megadása kötelező!",
            'amount.numeric' => "A mennyiség csak szám lehet!",
            'amount.min' => "Mennyiség minimum értéke 0!",
            'amount.max' => "Mennyiség maximum értéke 9999!",
            'price.required' => "Ár megadása kötelező!",
            'price.numeric' => "Az ár csak szám lehet!",
            'price.min' => "Ár minimum értéke 1!",
            'price.max' => "Ár maximum értéke 99999999!",
            'expiration.date' => "A lejárati dátum értéke csak dátum lehet!",
            'expiration.date_format' => "A lejárati dátum formátuma nem megfelelő (É-h-n Ó:p:m)!"
        ];
    }


    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
