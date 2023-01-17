<?php

namespace App\Http\Controllers;

use App\Http\Requests\RatingRequest;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    public function index()
    {
        $ratings = Rating::all();
        return response()->json($ratings);
    }
    public function create(RatingRequest $request)
    {
        $user = Auth::user();
        $rating = new Rating();
        $now = Rating::where('user_id', '=', $user->id)
            ->where('shop_id', '=', $request->get("shop_id"))
            ->get();
        if ($now->isEmpty()) {
            $rating->rating = $request->get("rating");
            $rating->shop_id = $request->get("shop_id");
            $rating->user_id = $user->id;
            $rating->save();
            return response()->json($rating->id);
        }
        return response()->json("A felhasználó már értékelte a boltot", 422);
    }
    public function update(Rating $rating, RatingRequest $request)
    {
        $rating->rating = $request->get("rating");
        $rating->save();
        return response()->json($rating->toArray());
    }
    public function delete(Rating $type)
    {
        $type->delete();
        return response()->json("OK");
    }
}
