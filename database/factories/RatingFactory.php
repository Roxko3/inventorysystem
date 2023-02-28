<?php

namespace Database\Factories;

use App\Models\Rating;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RatingFactory extends Factory
{
	public function getUniqueID()
	{
		$shops = Shop::all()->pluck('id')->toArray();
		$users = User::all()->pluck('id')->toArray();
		$ratings = [];
		for ($i = 0; $i < count($shops); $i++) {
			for ($j = 0; $j < count($users); $j++) {
				array_push($ratings,$shops[$i].'-'.$users[$j]);
			}
		}
		$pairs = $this->faker->unique->randomElement($ratings);
		return $pairs;
	}
	/**
	 * Define the model's default state.
	 *
	 * @return array
	 */
	public function definition()
	{
		//$ids = explode('-',$this->getUniqueID());
		$shop = Shop::inRandomOrder()->first();
		$shopid = $shop->id;
		$shopAndUser = $this->faker->unique()->regexify("/^$shopid-[0-9]");
		$userid = explode('-', $shopAndUser)[1];
		return [
			'shop_id' =>$shopid,
			'user_id' =>$userid,
			'rating' => $this->faker->numberBetween(1, 5),

		];
	}
}
