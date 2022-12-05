<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Storage;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class StorageSeeder extends Seeder
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
                'shop_id' => 1,
                'product_id' => 1,
                'amount' => 20,
                "prize" => 200,
                'expiration' => Carbon::parse("2022-12-30"),
            ],
            [
                'shop_id' => 1,
                'product_id' => 2,
                'amount' => 10,
                "prize" => 600
            ],
            [
                'shop_id' => 1,
                'product_id' => 3,
                'amount' => 50,
                "prize" => 50,
                'expiration' => Carbon::parse("2022-12-6"),
            ],
        ];

        
        foreach ($data as $item) {
            $storage = Storage::firstOrNew([
                'shop_id' => $item['shop_id'],
                'product_id' => $item['product_id']
            ]);
    
            foreach ($item as $key => $value) {
               $storage->{$key} = $value;
            };
    
            $storage->save();
        }
        

        /*DB::table('Storage')->insert([
            'shop_id' => 1,
            'product_id' => 3,
            'amount' => 50,
            "prize" => 50,
            'expiration' => Carbon::parse("2022-12-6")
        ]);*/
    }
}
