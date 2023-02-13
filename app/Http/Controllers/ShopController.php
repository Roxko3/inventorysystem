<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageRequest;
use App\Http\Requests\ShopRequest;
use App\Models\Log;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
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

    public function workers()
    {
        $user = Auth::user();
        $workers = User::where("shop_id", $user->shop_id)->get();
        return response()->json($workers);
    }

    public function create(ShopRequest $request)
    {
        $user = Auth::user();
        $user = User::where("id", $user->id)->first();
        $shop = new Shop();
        $shop->name = $request->get("name");
        $shop->shop_type_id = $request->get("shop_type_id");
        $shop->address = $request->get("address");
        $shop->owner = $request->get("owner");
        $shop->postal_code = $request->get("postal_code");
        $shop->save();
        $user->permission = 10;
        $user->save();
        return response()->json($shop->id);
    }

    public function uploadImage(Shop $shop, ImageRequest $request)
    {
        if (Gate::denies('shop-worker', $shop->id) || Gate::denies('shop-manager')) {
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
        if (Gate::denies('shop-worker', $shop->id) || Gate::denies('shop-manager')) {
            abort(403);
        }
        $user = Auth::user();
        $changedDatas = "";

        if ($shop->name != $request->get("name")) {
            $changedDatas = $changedDatas . " - Bolt neve: " . $shop->name . " -> " . $request->get("name");
            $shop->name = $request->get("name");
        }
        if ($shop->shop_type_id != $request->get("shop_type_id")) {
            $changedDatas = $changedDatas . " - Bolt típusa: " . $shop->shop_type_id . " -> " . $request->get("shop_type_id");
            $shop->shop_type_id = $request->get("shop_type_id");
        }
        if ($shop->address != $request->get("address")) {
            $changedDatas = $changedDatas . " - Bolt címe: " . $shop->address . " -> " . $request->get("address");
            $shop->address = $request->get("address");
        }
        if ($shop->owner != $request->get("owner")) {
            $changedDatas = $changedDatas . " - Bolt tulajdonosa: " . $shop->owner . " -> " . $request->get("owner");
            $shop->owner = $request->get("owner");
        }
        if ($shop->postal_code != $request->get("postal_code")) {
            $changedDatas = $changedDatas . " - Bolt irányítószáma: " . $shop->postal_code . " -> " . $request->get("postal_code");
            $shop->postal_code = $request->get("postal_code");
        }
        $shop->save();

        $log = new Log();
        $log->shop_id = $shop->id;
        $log->user_id = $user->id;
        $log->description = "A bolt adatai módosultak:" . $changedDatas;
        $log->date = now();
        $log->save();
        return response()->json($shop->toArray());
    }

    public function delete(Shop $shop)
    {
        if (Gate::denies('shop-worker', $shop->id) || Gate::denies('shop-owner')) {
            abort(403);
        }
        $workers = User::where('shop_id', $shop->id)->get();
        foreach ($workers as $worker) {
            $worker->shop_id = 0;
            $worker->permission = 0;
            $worker->save();
        }
        $shop->delete();
        return response()->json("Bolt sikeresen törölve!");
    }
}
