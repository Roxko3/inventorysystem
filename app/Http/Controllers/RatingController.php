<?php

namespace App\Http\Controllers;

use App\Http\Requests\RatingRequest;
use App\Models\Rating;
use App\Models\Shop;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    public function rate(RatingRequest $request)
    {
        $user = Auth::user();
        if ($request->get("rating") == 0) {
            $rating = Rating::where('user_id', '=', $user->id)
                ->where('shop_id', '=', $request->get("shop_id"))
                ->first();
            if ($rating == null) {
                //Ha 0-ás az értékelés, de nem létezik a felhasználótól értékelés erre a boltra.
                return response()->json("Nem létezik értékelés ettől a felhasználótól.", 404);
            }
            //Ha 0-ás az értékelés és van a felhasználótól már értékelés a boltra
            $rating->delete();
            return response()->json("Értékelés sikeresen törölve.");
        }
        //Ha normális az értékelés (1-5) vagy létrehozza, vagy módosítja
        $rating = Rating::firstOrNew(['user_id' =>  $user->id, 'shop_id' => $request->get("shop_id")]);
        $rating->rating = $request->get("rating");
        $rating->save();
        //Értékelés felvétele

        //Bolt értékelésének frissítése
        $shop = Shop::where("id", $request->get("shop_id"))->first();
        $ratings = Rating::where("shop_id", $shop->id)->get();
        $avgrating = 0;
        foreach ($ratings as $item) {
            $avgrating += $item->rating;
        }
        $count = $ratings->count();
        if ($count === 0) {
            $shop->rating = 0;
        }
        $avgrating = $avgrating / $count;
        $shop->rating = $avgrating;
        $shop->save();

        return response()->json("Értékelés sikeresen felvéve.");
    }
}
