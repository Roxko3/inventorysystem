<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageRequest;
use App\Http\Requests\OpeningHoursRequest;
use App\Http\Requests\ShopRequest;
use App\Models\OpeningHour;
use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;


class ShopController extends Controller
{
    public function index()
    {
        $shops = Shop::with("shopType", "ratings")->paginate(10);
        return response()->json($shops);
    }

    public function get(Shop $shop)
    {
        $shop = Shop::with("shopType", "ratings")->where("id", $shop->id)->get();
        return response()->json($shop);
    }

    public function create(ShopRequest $request)
    {
        $shop = new Shop();
        $shop->name = $request->get("name");
        $shop->shop_type_id = $request->get("shop_type_id");
        $shop->address = $request->get("address");
        $shop->owner = $request->get("owner");
        $shop->postal_code = $request->get("postal_code");
        $shop->save();
        return response()->json($shop->id);
    }

    public function uploadImage(Shop $shop, ImageRequest $request)
    {
        if (Gate::denies('shop-access', $shop)) {
            abort(403);
        }
        $newImageName = time() .
            '-' .
            $request->file('image')->getClientOriginalName();
        $request->file("image")
            ->move(storage_path('images'), $newImageName);
        $shop->image_path = $newImageName;
        $shop->save();

        return response()->json("Kép feltöltés sikeres!");
    }

    public function update(Shop $shop, ShopRequest $request)
    {
        if (Gate::denies('shop-access', $shop)) {
            abort(403);
        }
        $shop->name = $request->get("name");
        $shop->shop_type_id = $request->get("shop_type_id");
        $shop->address = $request->get("address");
        $shop->owner = $request->get("owner");
        $shop->postal_code = $request->get("postal_code");
        $shop->save();
        return response()->json($shop->toArray());
    }

    public function updateOpeningHours(Shop $shop, OpeningHoursRequest $request)
    {
        if (Gate::denies('shop-access', $shop) || Gate::denies('shop-worker', $shop)) {
            abort(403);
        }
        foreach ($request->input('opening_hours') as $day => $hours) {
            $opening = OpeningHour::where('shop_id', $shop->id)->where('day', $day)->first();
            $opening->open = $hours['open_time'];
            $opening->close = $hours['close_time'];
            $opening->save();
        }
    }



    public function delete(Shop $shop)
    {
        $shop->delete();
        return response()->json("Bolt sikeresen törölve!");
    }
}
