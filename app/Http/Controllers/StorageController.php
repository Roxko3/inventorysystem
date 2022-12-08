<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorageRequest;
use App\Models\Storage;
use Illuminate\Http\Request;

class StorageController extends Controller
{
    public function indexstorage()
    {
        $storage = Storage::with("product", "shop")->get();
        return response()->json($storage);
    }
    public function createstorage(StorageRequest $request)
    {
        $storage = new Storage();
        $storage->shop_id = $request->get("shop_id");
        $storage->product_id = $request->get("product_id");
        $storage->amount = $request->get("amount");
        $storage->prize = $request->get("prize");
        $storage->expiration = $request->get("expiration");
        $storage->save();
        return response()->json($storage->shop_id);
    }
    public function updatestorage(Storage $storage, StorageRequest $request)
    {

        $storage->shop_id = $request->get("shop_id");
        $storage->product_id = $request->get("product_id");
        $storage->amount = $request->get("amount");
        $storage->prize = $request->get("prize");
        $storage->expiration = $request->get("expiration");
        $storage->save();
        return response()->json($storage->toArray());
    }
    public function deletestorage(Storage $storage)
    {
        $storage->delete();
        return response()->json("OK");
    }
}
