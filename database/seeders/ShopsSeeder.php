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
                'postal_code' => 9730
            ],
            [
                'id' => 2,
                'name' => "Tesco",
                'shop_type_id' => "1",
                'address' => "Zanati út 70",
                'owner' => "Tesco PLC",
                'postal_code' => 9700
            ],
            [
                'id' => 3,
                'name' => "Coop",
                'shop_type_id' => "3",
                'address' => "Széchenyi tér 13",
                'owner' => "Co-op Hungary Zrt.",
                'postal_code' => 9735
            ],
            [
                'id' => 4,
                'name' => "Varga PC MOBIL & Irodatechnika",
                'shop_type_id' => "3",
                'address' => "Várkör 16",
                'owner' => "Bestbyte műszaki",
                'postal_code' => 9730
            ],
            [
                'id' => 5,
                'name' => "TESCO expressz",
                'shop_type_id' => "3",
                'address' => "IV. László király u. 39",
                'owner' => "Tesco PLC",
                'postal_code' => 9400
            ],
            [
                'id' => 6,
                'name' => "TESCO expressz",
                'shop_type_id' => "3",
                'address' => "Király J. u 3",
                'owner' => "Tesco PLC",
                'postal_code' => 9400
            ],
            [
                'id' => 7,
                'name' => "TESCO Hipermarket",
                'shop_type_id' => "2",
                'address' => "Ipar krt. 30",
                'owner' => "Tesco PLC",
                'postal_code' => 9400
            ],
            [
                'id' => 8,
                'name' => "Tesco Expressz",
                'shop_type_id' => "3",
                'address' => "Hátsókapu 10",
                'owner' => "Tesco PLC",
                'postal_code' => 9400
            ],
            [
                'id' => 9,
                'name' => "TESCO expressz",
                'shop_type_id' => "3",
                'address' => "József A. u 1",
                'owner' => "Tesco PLC",
                'postal_code' => 9400
            ],
            [
                'id' => 10,
                'name' => "TESCO expressz",
                'shop_type_id' => "3",
                'address' => "Lackner Kristóf u. 11",
                'owner' => "Tesco PLC",
                'postal_code' => 9400
            ],
            [
                'id' => 11,
                'name' => "TESCO expressz",
                'shop_type_id' => "3",
                'address' => "Végfordulat 9",
                'owner' => " Peter Gazik",
                'postal_code' => 9400
            ],
            [
                'id' => 12,
                'name' => "Yettel",
                'shop_type_id' => "3",
                'address' => " Ipar krt. 30",
                'owner' => "Tesco PLC",
                'postal_code' => 9400
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
