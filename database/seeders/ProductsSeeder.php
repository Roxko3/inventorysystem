<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'id' => 1,
                'name' => "Tej",
                'packaging' => "karton",
                "unit_of_measure" => "rekesz",
                'type' => "élelmiszer"
            ],
            [
                'id' => 2,
                'name' => "Bor",
                'packaging' => "üveg",
                "unit_of_measure" => "darab",
                'type' => "élelmiszer"
            ],
            [
                'id' => 3,
                'name' => "Zsemle",
                'packaging' => "nincs",
                "unit_of_measure" => "darab",
                'type' => "élelmiszer"
            ],
        ];

        foreach ($data as $item) {
            $product = Product::firstOrNew([
                'id' => $item['id']
            ]);

            foreach ($item as $key => $value) {
                $product->{$key} = $value;
            };

            $product->save();
        }
        Product::factory()->count(500)->create();
    }
}
