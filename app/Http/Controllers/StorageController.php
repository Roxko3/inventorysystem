<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorageRequest;
use App\Models\Log;
use App\Models\Shop;
use App\Models\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StorageController extends Controller
{
    public function index()
    {
        $storage = Storage::with("shop", "product")->get();
        return response()->json($storage);
    }

    public function getStorage(Shop $shop)
    {
        $storage = Storage::with("product")->where("shop_id", $shop->id)->paginate(20);
        return response()->json($storage);
    }

    public function add(StorageRequest $request)
    {
        $storage = Storage::where('shop_id', $request->get("shop_id"))
            ->where('product_id', $request->get("product_id"))
            ->where('expiration', $request->get("expiration"))
            ->first();

        if ($storage != null) {
            return response()->json("A megadott termék már szerepel a boltban, amennyiben ezen változtatni szeretne, használja a szerkesztés lehetőséget.");
        }

        $storage = new Storage();
        $storage->shop_id = $request->get("shop_id");
        $storage->product_id = $request->get("product_id");
        $storage->amount = $request->get("amount");
        $storage->price = $request->get("price");
        $storage->expiration = $request->has("expiration") ? $request->get("expiration") : null;
        $storage->save();

        $user = Auth::user();
        $log = new Log();
        $product = DB::table("products")->where("id", '=', $request->get("product_id"))->first();

        $log->shop_id = $storage->shop_id;
        $log->user_id = $user->id;
        $log->description = "Új terméket rögzített a raktárban: "
            . $product->name . " (" . $storage->amount . "), ár: "
            . $storage->price . " Ft, lejárat: " . ($request->get("expiration") == null ?  "nincs" : $request->get("expiration"));
        $log->date = now();
        $log->save();

        return response()->json($storage->id);
    }
    public function update(Storage $storage, StorageRequest $request)
    {
        $storage->amount = $request->get("amount");
        $storage->price = $request->get("price");
        $storage->expiration = $request->has("expiration") ? $request->get("expiration") : null;
        $storage->save();

        $user = Auth::user();
        $log = new Log();
        $product = DB::table("products")->where("id", '=', $request->get("product_id"))->first();

        $log->shop_id = $storage->shop_id;
        $log->user_id = $user->id;
        $log->description = "Módosított egy terméket a raktárban: "
            . $product->name . " (" . $storage->amount . "), ár: "
            . $storage->price . " Ft, lejárat: " . ($request->get("expiration") == null ?  "nincs" : $request->get("expiration"));
        $log->date = now();
        $log->save();

        return response()->json($storage->toArray());
    }
    public function delete(Storage $storage)
    {
        $storage->amount = 0;
        $storage->is_deleted = true;
        $storage->save();
        return response()->json("Áru törölve!");
    }
}
