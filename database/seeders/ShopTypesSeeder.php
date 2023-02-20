<?php

namespace Database\Seeders;

use App\Models\ShopType;
use Illuminate\Database\Seeder;

class ShopTypesSeeder extends Seeder
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
                'name' => "Hipermarket",
                'description' => "Több 10000 SKU választék (stock keeping unit - cikkelem) min. 30% non-food/tartós fogy. cikkek, ruházat... egyéb „nem napi cikk”/ 10+ pénztárgép",
                'size' => "1000+"
            ],
            [
                'id' => 2,
                'name' => "Szupermarket",
                'description' => "Néhányezer SKU 3-10 pénztárgép",
                'size' => "400-1000"
            ],
            [
                'id' => 3,
                'name' => "Kis (vegyes)bolt",
                'description' => "CBA, egyéb lkáncok: esély a túlélésre, versenyképesebbek",
                'size' => "0-400"
            ]
        ];
        foreach ($data as $item) {
            $shoptype = ShopType::firstOrNew([
                'id' => $item['id']
            ]);
    
            foreach ($item as $key => $value) {
               $shoptype->{$key} = $value;
            };
    
            $shoptype->save();
        }
    }
}
