<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorageRequest;
use App\Models\Storage;
use Illuminate\Http\Request;

class StorageController extends Controller
{
    public function indexstorage()
    {
        $Storage = Storage::with("product","shop")->get();
        return response()->json($Storage);
    }
    public function createstorage(StorageRequest $request)
    {
        $Storage = new Storage();
        $Storage->shop_id = $request->get("shop_id");
        $Storage->product_id = $request->get("product_id");
        $Storage->amount= $request->get("amount");
        $Storage->prize= $request->get("prize");
        $Storage->expiration= $request->get("expiration");
        $Storage->save();
        return response()->json($Storage->id);
    }
    public function updatestorage(Storage $Storage, StorageRequest $request)
    {
        
        $Storage->shop_id = $request->get("shop_id");
        $Storage->product_id = $request->get("product_id");
        $Storage->amount= $request->get("amount");
        $Storage->prize= $request->get("prize");
        $Storage->expiration= $request->get("expiration");
        $Storage->save();
        return response()->json($Storage->toArray());
    }
    public function deletestorage(Storage $Storage)
    {
        $Storage->delete();
        return response()->json("OK");
    }
}
