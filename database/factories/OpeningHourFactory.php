<?php

namespace Database\Factories;

use App\Models\OpeningHour;
use App\Models\Shop;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class OpeningHourFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        do {
            $shop_id = $this->faker->numberBetween(1, Shop::count());
            $now = OpeningHour::where('shop_id','=', $shop_id)->first();
        } while ($now);
        $day ='Sunday';
        $is_open = $this->faker->boolean(80);
        $open = '09:00';
        $close = '20:00' ;
        DB::table('Opening_Hours')->insert([
            'shop_id' => $shop_id, 
            'day' => 'Monday', 
            'is_open' =>  $is_open = $this->faker->boolean(80),
            'open' => ($is_open?$open: null),
            'close' => ($is_open?$close: null) ,
          ]);
          DB::table('Opening_Hours')->insert([
            'shop_id' => $shop_id, 
            'day' => 'Tuesday', 
            'is_open' =>  $is_open = $this->faker->boolean(80),
            'open' => ($is_open?$open: null),
            'close' => ($is_open?$close: null) ,
          ]);
          DB::table('Opening_Hours')->insert([
            'shop_id' => $shop_id, 
            'day' => 'Wednesday', 
            'is_open' =>  $is_open = $this->faker->boolean(80),
            'open' => ($is_open?$open: null),
            'close' => ($is_open?$close: null) ,
          ]);
          DB::table('Opening_Hours')->insert([
            'shop_id' => $shop_id, 
            'day' => 'Thursday', 
            'is_open' =>  $is_open = $this->faker->boolean(80),
            'open' => ($is_open?$open: null),
            'close' =>($is_open?$close: null) ,
          ]);
          DB::table('Opening_Hours')->insert([
            'shop_id' => $shop_id, 
            'day' => 'Friday', 
            'is_open' =>  $is_open = $this->faker->boolean(30),
            'open' => ($is_open?$open: null),
            'close' => ($is_open?$close: null),
          ]);
          DB::table('Opening_Hours')->insert([
            'shop_id' => $shop_id, 
            'day' => 'Saturday', 
            'is_open' =>  $is_open = $this->faker->boolean(30),
            'open' => ($is_open?$open: null),
            'close' => ($is_open?$close: null) ,
          ]);


        return [
            'shop_id' => $shop_id ,
            'day' => $day,
            'is_open' => $is_open ,
            'open' => ($is_open?$open: null),
            'close' => ($is_open?$close: null) ,
        ];
    }
}
