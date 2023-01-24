<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->lexify('Product-???????'),
            'packaging' => $this->faker->randomElement([
                'karton',
                'üveg',
                'nincs',
            ]),
            'unit_of_measure' => $this->faker->randomElement([
                'darab',
                'liter',
            ]),
            'type' => $this->faker->randomElement([
                'élelmiszer',
                'ruházat',
                'elektronika',
                'kertészet',
                'játékok',
            ]),
        ];
    }
}
