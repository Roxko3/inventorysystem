<?php

namespace Database\Seeders;

use App\Models\Rating;
use Illuminate\Database\Seeder;

class RatingErrorSeeder extends Seeder
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
                'user_id' => 1,
                'rating' => "123",
            ],
            [
                'id' => 2,
                'shop_id' => 1,
                'user_id' => 2,
                'rating' => "4",
            ],
            [
                'id' => 3,
                'shop_id' => 1,
                'user_id' => 3,
                'rating' => "3",
            ],
            [
                'id' => 4,
                'shop_id' => 1,
                'user_id' => 4,
                'rating' => "2",
            ],
            [
                'id' => 5,
                'shop_id' => 2,
                'user_id' => 1,
                'rating' => "4",
            ],
            [
                'id' => 6,
                'shop_id' => 2,
                'user_id' => 2,
                'rating' => "3",
            ],
            [
                'id' => 7,
                'shop_id' => 2,
                'user_id' => 3,
                'rating' => "3",
            ],
            [
                'id' => 8,
                'shop_id' => 1,
                'user_id' => 5,
                'rating' => "1",
            ],
        ];
        foreach ($data as $item) {
            $rating = Rating::firstOrNew([
                'id' => $item['id']
            ]);

            foreach ($item as $key => $value) {
                $rating->{$key} = $value;
            };

            $rating->save();
        }
    }
}
