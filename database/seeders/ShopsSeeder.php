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
