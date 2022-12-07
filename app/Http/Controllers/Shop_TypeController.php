<?php

namespace App\Http\Controllers;

use App\Http\Requests\Shop_TypeRequest;
use App\Models\ShopType;
use Illuminate\Http\Request;

class Shop_TypeController extends Controller
{
    public function indextype()
    {
        $shopstype = ShopType::all();
        return response()->json($shopstype);
    }
    public function createtype(Shop_TypeRequest $request)
    {
        $shopstype = new ShopType();
        $shopstype->name = $request->get("name");
        $shopstype->description = $request->get("description");
        $shopstype->size= $request->get("size");
        
        $shopstype->save();
        return response()->json($shopstype->id);
    }
    public function update(ShopType $shoptype, Shop_TypeRequest $request)
    {
        
        $shoptype->name = $request->get("name");
        $shoptype->description = $request->get("description");
        $shoptype->size= $request->get("size");
        $shoptype->save();
        return response()->json($shoptype->toArray());
    }
    public function delete(ShopType $type , $id) 
    {
    $type->destroy($id);
    return response()->json("OK");
    }
}
