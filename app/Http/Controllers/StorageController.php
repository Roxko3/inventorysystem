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

    public function searchStorage($searchString)
    {
        $user = Auth::user();
        $current_shop_id = $user->shop_id;

        $storage = Storage::join('products', 'storages.product_id', '=', 'products.id')
            ->where([
                ['name', 'LIKE', '%' . $searchString . '%'],
                ['shop_id', '=', $current_shop_id],
            ])->orWhere([
                ['type', 'LIKE', '%' . $searchString . '%'],
                ['shop_id', '=', $current_shop_id],
            ])->paginate(20);
        return response()->json($storage);
    }

    public function add(StorageRequest $request)
    {
        $storage = Storage::firstOrNew([
            'shop_id' =>  $request->get("shop_id"),
            'product_id' => $request->get("product_id"),
            'expiration' => $request->get("expiration")
        ]);
        if ($storage->price != $request->get("price")) {
            return response()->json("A megadott termék már szerepel a boltban más árral, amennyiben ezen változtatni szeretne, használja a szerkesztés lehetőséget.");
        }
        $storage->price = $request->get("price");
        $storage->amount += $request->get("amount");
        $storage->is_deleted = false;
        $storage->expiration = $request->get("expiration");
        $storage->save();
        return response()->json($storage->id);
    }
    public function update(Storage $storage, StorageRequest $request)
    {
        $storage->amount = $request->get("amount");
        $storage->price = $request->get("price");
        $storage->expiration = $request->get("expiration");
        $storage->save();
        return response()->json($storage->toArray());
    }
    public function delete(Request $request)
    {
        try {
            DB::table('storages')->whereIn('id', $request->ids)->delete();

            return response()->json("Termékek sikeresen törölve a raktárból!");
        } catch (\Exception $e) {
            return response()->json("Sirtelen törlés!", 400);
        }

        /*$storage->amount = 0;
        $storage->is_deleted = true;
        $storage->save();
        return response()->json("Áru törölve!");*/
    }
}
