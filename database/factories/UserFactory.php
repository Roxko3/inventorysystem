<?php

namespace Database\Factories;

use App\Models\Shop;
use Illuminate\Database\Eloquent\Factories\Factory;


class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = \Faker\Factory::create('hu_HU');
        
        return [
            'email' => $this->faker->unique()->email(),
            'name' =>$faker->lastName . ' ' . $faker->firstName,
            'password' => bcrypt($this->faker->word()),
            'permission' => $this->faker->numberBetween(0, 10),
            'city' => $faker->city(),
            'shop_id' => rand(0, 1) < 0.9 ? null :Shop::all()->random()->id,
            'email_verified_at' => $this->faker->optional($weight = 50)->dateTimeBetween('-1 years', '+8 years'),
        ];
    }
    //Shop::all()->random()->id
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
