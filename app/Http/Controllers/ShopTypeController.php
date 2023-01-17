<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShopTypeRequest;
use App\Models\ShopType;
use Illuminate\Http\Request;

class ShopTypeController extends Controller
{
    public function index()
    {
        $shopstype = ShopType::all();
        return response()->json($shopstype);
    }
    public function create(ShopTypeRequest $request)
    {
        $shopstype = new ShopType();
        $shopstype->name = $request->get("name");
        $shopstype->description = $request->get("description");
        $shopstype->size = $request->get("size");

        $shopstype->save();
        return response()->json($shopstype->id);
    }
    public function update(ShopType $shoptype, ShopTypeRequest $request)
    {

        $shoptype->name = $request->get("name");
        $shoptype->description = $request->get("description");
        $shoptype->size = $request->get("size");
        $shoptype->save();
        return response()->json($shoptype->toArray());
    }
    public function delete(ShopType $type)
    {
        $type->delete();
        return response()->json("OK");
    }
}
