<?php

namespace Database\Factories;

use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'shop_id' =>Shop::all()->random()->id, 
            'user_id' =>User::all()->random()->id, 
            'description' =>$this->faker->sentence, 
            'date' =>$this->faker->dateTimeBetween('-8 week', '+8 week'),
        ];
    }
}
