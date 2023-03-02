<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use App\Models\Log;

class LogsSeeder extends Seeder
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
                'user_id' => 1,
                'shop_id' => 1,
                'description' => "Egy almát törölt a rendszerből, mert megromlott",
                'date' => Carbon::parse("2022-12-05"),
            ],
            [
                'id' => 2,
                'user_id' => 1,
                'shop_id' => 1,
                'description' => "Hozzáadott egy almát rendszerhez, mert mégsem megromlott",
                'date' => Carbon::parse("2022-12-06"),
            ],
            [
                'id' => 3,
                'user_id' => 1,
                'shop_id' => 1,
                'description' => "Egy almát törölt a rendszerből, mert mégis megromlott",
                'date' => Carbon::parse("2022-12-07"),
            ],
            [
                'id' => 4,
                'user_id' => 1,
                'shop_id' => 1,
                'description' => "Egy almát törölt a rendszerből, mert igazából mégsem romlott meg",
                'date' => Carbon::parse("2022-12-08"),
            ]
        ];
        foreach ($data as $item) {
            $log = Log::firstOrNew([
                'id' => $item['id']
            ]);

            foreach ($item as $key => $value) {
                $log->{$key} = $value;
            };

            $log->save();
        }
        Log::factory()->count(200)->create();
    }
}
