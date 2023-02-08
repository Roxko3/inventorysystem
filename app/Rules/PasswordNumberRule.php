<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class PasswordNumberRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $string = preg_replace('/[^0-9]/', '', $value);
        return is_numeric($string);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'A jelszó legalább egy számot tartalmazzon.';
    }
}
