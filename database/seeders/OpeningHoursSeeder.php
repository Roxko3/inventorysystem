<?php

namespace Database\Seeders;

use App\Models\OpeningHour;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class OpeningHoursSeeder extends Seeder
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
                'shop_id' => 1,
                'day' => "Monday",
                'is_open' => false,
            ],
            [
                'id' => 2,
                'shop_id' => 1,
                'day' => "Tuesday",
                'is_open' => true,
                'open' => "08:00",
                'close' => "16:00",
            ],
            [
                'id' => 3,
                'shop_id' => 1,
                'day' => "Wednesday",
                'is_open' => true,
                'open' => "08:00",
                'close' => "16:00",
            ],
            [
                'id' => 4,
                'shop_id' => 1,
                'day' => "Thursday",
                'is_open' => true,
                'open' => "08:00",
                'close' => "16:00",
            ],
            [
                'id' => 5,
                'shop_id' => 1,
                'day' => "Friday",
                'is_open' => true,
                'open' => "08:00",
                'close' => "16:00",
            ],
            [
                'id' => 6,
                'shop_id' => 1,
                'day' => "Saturday",
                'is_open' => true,
                'open' => "08:00",
                'close' => "20:00",
            ],
            [
                'id' => 7,
                'shop_id' => 1,
                'day' => "Sunday",
                'is_open' => false
            ]
        ];

        foreach ($data as $item) {
            $openingHour = OpeningHour::firstOrNew([
                'id' => $item['id']
            ]);

            foreach ($item as $key => $value) {
                $openingHour->{$key} = $value;
            };

            $openingHour->save();
        }
    }
}
