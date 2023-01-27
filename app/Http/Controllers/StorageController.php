<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorageRequest;
use App\Models\Log;
use App\Models\Shop;
use App\Models\Storage;
use Illuminate\Http\Request;

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
        $storage = new Storage();
        $storage->shop_id = $request->get("shop_id");
        $storage->product_id = $request->get("product_id");
        $storage->amount = $request->get("amount");
        $storage->price = $request->get("price");
        $storage->expiration = $request->has("expiration") ? $request->get("expiration") : null;
        $storage->save();
        return response()->json($storage->id);
    }
    public function update(Storage $storage, StorageRequest $request)
    {
        $storage->shop_id = $request->get("shop_id");
        $storage->product_id = $request->get("product_id");
        $storage->amount = $request->get("amount");
        $storage->price = $request->get("price");
        $storage->updated_at = now();
        $storage->expiration = $request->get("expiration");
        $storage->save();
        return response()->json($storage->toArray());
    }
    public function delete(Storage $storage)
    {
        $storage->is_deleted = true;
        $storage->save();
        return response()->json("Áru törölve!");
    }
}
