<?php

namespace Database\Seeders;

use App\Models\Shop;
use Illuminate\Database\Seeder;

class ShopsSeeder extends Seeder
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
                'name' => "Tesco",
                'shop_type_id' => "2",
                'address' => "Pogányi út 7",
                'owner' => "Tesco PLC",
                'postal_code' => 9730,
                'image_path' => "tesco1.jpg",
                'rating' => 4.75
            ],
            [
                'id' => 2,
                'name' => "Tesco",
                'shop_type_id' => "1",
                'address' => "Zanati út 70",
                'owner' => "Tesco PLC",
                'postal_code' => 9700,
                'image_path' => "tesco2.jpg",
                'rating' => 3.75
            ],
            [
                'id' => 3,
                'name' => "Coop",
                'shop_type_id' => "3",
                'address' => "Széchenyi tér 13",
                'owner' => "Co-op Hungary Zrt.",
                'image_path' => "coop1.jpg",
                'postal_code' => 9735,
                'rating' => 2.37
            ],
            [
                'id' => 4,
                'name' => "Varga PC MOBIL & Irodatechnika",
                'shop_type_id' => "3",
                'address' => "Várkör 16",
                'owner' => "Bestbyte műszaki",
                'image_path' => "vargapc.jpg",
                'postal_code' => 9730,
                'rating' => 3
            ],
            [
                'id' => 5,
                'name' => "TESCO expressz",
                'shop_type_id' => "3",
                'address' => "IV. László király u. 39",
                'owner' => "Tesco PLC",
                'postal_code' => 9400,
                'rating' => 1
            ],
            [
                'id' => 6,
                'name' => "TESCO expressz",
                'shop_type_id' => "3",
                'address' => "Király J. u 3",
                'owner' => "Tesco PLC",
                'postal_code' => 9400,
                'rating' => 4.11
            ],
            [
                'id' => 7,
                'name' => "TESCO Hipermarket",
                'shop_type_id' => "2",
                'address' => "Ipar krt. 30",
                'owner' => "Tesco PLC",
                'postal_code' => 9400,
                'rating' => 5
            ],
            [
                'id' => 8,
                'name' => "Tesco Expressz",
                'shop_type_id' => "3",
                'address' => "Hátsókapu 10",
                'owner' => "Tesco PLC",
                'postal_code' => 9400,
                'rating' => 2
            ],
            [
                'id' => 9,
                'name' => "TESCO expressz",
                'shop_type_id' => "3",
                'address' => "Végfordulat 9",
                'owner' => " Peter Gazik",
                'postal_code' => 9400,
                'rating' => 5
            ],
            [
                'id' => 10,
                'name' => "Yettel",
                'shop_type_id' => "3",
                'address' => " Ipar krt. 30",
                'owner' => "Tesco PLC",
                'postal_code' => 9400,
                'rating' => 3.33
            ],
        ];
        foreach ($data as $item) {
            $shop = Shop::firstOrNew([
                'id' => $item['id']
            ]);

            foreach ($item as $key => $value) {
                $shop->{$key} = $value;
            };

            $shop->save();
        }
    }
}
