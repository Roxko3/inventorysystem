<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator as Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException  as ValidationException;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => "required|unique", //unique valszeg rossz lesz
            'name' => "required",
            'password' => "required",
            'permission' => "numeric",
            'postal_code' => "numeric",
            'shop_id' => "numeric",
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
