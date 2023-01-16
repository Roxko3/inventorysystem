<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShopRequest;
use Illuminate\Http\Request;
use App\Models\Shop;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class ShopController extends Controller
{
    public function index()
    {
        $shops = Shop::with("shopType")->get();
        return response()->json($shops);
    }

    public function get(Shop $shop)
    {
        if (Gate::denies('update-shop', $shop)) {
            abort(403);
        }
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

    public function update(Shop $shop, ShopRequest $request)
    {
        if (Gate::denies('update-shop', $shop)) {
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

    public function delete(Shop $shop)
    {
        $shop->delete();
        return response()->json("OK");
    }
}
