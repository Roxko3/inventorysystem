<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator as Validator;
use Illuminate\Validation\ValidationException;
use App\Rules\CheckColumnRule;

class OrderRequest extends FormRequest
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
            'column' => ["nullable", new CheckColumnRule],
            'order' => "nullable",
            'searchString' => "nullable",
            'is_deleted' => "nullable|number|min:0|max:2"
        ];
    }

    public function messages()
    {
        return [
            'is_deleted.number' => 'A törölt-e mező értéke csak suám lehet!',
            'is_deleted.min' => 'A törölt-e mező minimum értéke 0!',
            'is_deleted.max' => 'A törölt-e mező maximum értéke 2!',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator, response()->json($validator->errors(), 422)));
    }
}
