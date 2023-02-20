<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageRequest;
use App\Http\Requests\ShopRequest;
use App\Models\Log;
use App\Models\Rating;
use App\Models\Shop;
use App\Models\Storage;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;


class ShopController extends Controller
{
    public function index()
    {
        $shops = Shop::with("shopType")->paginate(8);
        return response()->json($shops);
    }

    public function get(Shop $shop)
    {
        $shop = Shop::with("shopType")->where("id", $shop->id)->first();
        $ratings = Rating::where("shop_id", $shop->id)->get();
        $ratingarray = [0, 0, 0, 0, 0];
        foreach ($ratings as $item) {
            switch ($item->rating) {
                case 1:
                    $ratingarray[0] += 1;
                    break;
                case 2:
                    $ratingarray[1] += 1;
                    break;
                case 3:
                    $ratingarray[2] += 1;
                    break;
                case 4:
                    $ratingarray[3] += 1;
                    break;
                case 5:
                    $ratingarray[4] += 1;
                    break;
                default:
                    return response()->json("Szerver hiba!", 500);
                    break;
            }
        }
        $user = Auth::user();
        $yourrating = Rating::where("user_id", $user->id)->where("shop_id", $shop->id)->first();

        return response()->json(["shop" => $shop, "ratings" => ["star1" => $ratingarray[0], "star2" => $ratingarray[1], "star3" => $ratingarray[2], "star4" => $ratingarray[3], "star5" => $ratingarray[4]], "your_rating" => $yourrating === null ? 0 : $yourrating->rating], 200);
    }

    public function create(ShopRequest $request)
    {
        $user = Auth::user();
        $user = User::where("id", $user->id)->first();
        $user->permission = 10;
        $user->save();

        $shop = new Shop();
        $shop->name = $request->get("name");
        $shop->shop_type_id = $request->get("shop_type_id");
        $shop->address = $request->get("address");
        $shop->owner = $request->get("owner");
        $shop->postal_code = $request->get("postal_code");
        $shop->save();

        $log = new Log();
        $log->shop_id = $shop->id;
        $log->user_id = $user->id;
        $log->description = $user->name . " sikeresen létrehozta a boltot";
        $log->date = now();
        $log->save();

        return response()->json($shop->id);
    }

    public function uploadImage(Shop $shop, ImageRequest $request)
    {
        if (Gate::denies('shop-worker', $shop->id) || Gate::denies('shop-manager')) {
            return response()->json("Csak a megfelelő jogokkal lehet képet feltölteni!", 403);
        }

        if (file_exists(public_path() . "\\storage\\" . $shop->image_path)) {
            unlink(public_path() . "\\storage\\" . $shop->image_path);
        }
        $newImageName = time() .
            '-' .
            $request->file('image')->getClientOriginalName();
        $request->file("image")
            ->move(storage_path('images'), $newImageName);
        $shop->image_path = $newImageName;
        $shop->save();

        $user = Auth::user();
        $log = new Log();
        $log->shop_id = $shop->id;
        $log->user_id = $user->id;
        $log->description = $user->name . " módosította a bolt képét";
        $log->date = now();
        $log->save();

        return response()->json("Kép feltöltés sikeres!");
    }

    public function update(Shop $shop, ShopRequest $request)
    {
        if (Gate::denies('shop-worker', $shop->id) || Gate::denies('shop-manager')) {
            return response()->json("Csak a megfelelő jogokkal lehet módosítani a bolt adatain!", 403);
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

        if ($changedDatas != "") {
            $log = new Log();
            $log->shop_id = $shop->id;
            $log->user_id = $user->id;
            $log->description = $user->name . " módosította a bolt adatait:" . $changedDatas;
            $log->date = now();
            $log->save();
        }

        return response()->json($shop->toArray());
    }

    public function delete(Shop $shop)
    {
        if (Gate::denies('shop-worker', $shop->id) || Gate::denies('shop-owner')) {
            return response()->json("Csak a bolt létrehozója tudja törölni a boltot!", 403);
        }

        $workers = User::where('shop_id', $shop->id)->get();
        foreach ($workers as $worker) {
            $worker->shop_id = null;
            $worker->permission = 0;
            $worker->save();
        }

        $shop->is_deleted = true;
        $shop->save();
        return response()->json("Bolt sikeresen törölve!");
    }
}
