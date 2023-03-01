<?php

namespace Database\Factories;

use App\Models\ShopType;
use Illuminate\Database\Eloquent\Factories\Factory;

class ShopFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = \Faker\Factory::create('hu_HU');
       $des= $faker->address();
       $utca = explode(',',$des);
       $varos = explode(' ',$utca[0]);
        return [
            'name' => $faker->unique()->company(),
            'shop_type_id' =>ShopType::all()->random(),
            'address' => $utca[1],
            'owner' => $this->faker->name(),
            'city' => $varos[1],
            'image_path' => null,
            'rating' => 0,
            'is_deleted' => 0,
        ];
    }
}
