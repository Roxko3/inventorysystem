<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Shop;
use Illuminate\Database\Eloquent\Factories\Factory;

class StorageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'shop_id' => Shop::all()->random()->id,
            'product_id' => Product::all()->random()->id,
            'amount' => $this->faker->randomNumber(4, false),
            'price' => $this->faker->randomNumber(5, false),
            'created_at' => $this->faker->dateTimeBetween('-8 week', '-7 week'),
            'updated_at' => $this->faker->dateTimeBetween('-6 week', '-5 week'),
            'expiration' => $this->faker->optional($weight = 80)->dateTimeBetween('-1 week', '+3 week'),
            'is_deleted' => $this->faker->boolean(50),
        ];
    }
}
