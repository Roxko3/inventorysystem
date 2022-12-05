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
                'name' => "tej",
                'packaging' => "karton",
                "unit_of_measure" => "liter",
                'type' => "élelmiszer"
            ],
            [
                'id' => 2,
                'name' => "sör",
                'packaging' => "üveg",
                "unit_of_measure" => "liter",
                'type' => "élelmiszer"
            ],
            [
                'id' => 3,
                'name' => "semle",
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
    }
}
