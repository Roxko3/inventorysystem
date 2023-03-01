<?php

namespace Database\Factories;

use App\Models\Rating;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class RatingFactory extends Factory
{

	/**
	 * Define the model's default state.
	 *
	 * @return array
	 */
	protected $model = Rating::class;

	public function definition()
	{

		$ratingValue = $this->faker->numberBetween(1, 5);


		do {

			$shopId = Shop::pluck('id')->random();
			$userId = User::pluck('id')->random();
			$now = Rating::where('shop_id', '=', $shopId)->where('user_id', '=', $userId)->first();
			$owner = User::where('shop_id', '=', $shopId)->where('id', '=', $userId)->first();
		} while ($now || $owner);



		return [
			'shop_id' => $shopId,
			'user_id' => $userId,
			'rating' => $ratingValue,
		];
	}
}
