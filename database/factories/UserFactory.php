<?php

namespace Database\Factories;

use App\Models\Shop;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'email' => $this->faker->unique()->email(),
            'name' => $this->faker->unique()->name(),
            'password' => bcrypt($this->faker->word()),
            'permission' => $this->faker->numberBetween(0, 10),
            //'postal_code' =>$this->faker->randomNumber(4 ,true),
            'shop_id' => Shop::all()->random()->id,
            'email_verified_at' => $this->faker->optional($weight = 70)->dateTimeBetween('-1 years', '+8 years'),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
