<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Http\Requests\StorageRequest;
use App\Http\Requests\UpdateStorageRequest;
use App\Models\Log;
use App\Models\Shop;
use App\Models\Storage;
use Illuminate\Database\Eloquent\Builder;
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

    public function searchStorage(OrderRequest $request, Shop $shop, $searchString)
    {
        $current_shop_id = $shop->id;
        $storage = Storage::with("shop", "product")->join('products', 'storages.product_id', '=', 'products.id')
            ->where([
                ['shop_id', '=', $current_shop_id],
                ['name', 'LIKE', '%' . $searchString . '%']
            ])->orWhere([
                ['shop_id', '=', $current_shop_id],
                ['type', 'LIKE', '%' . $searchString . '%']
            ])->orderBy($request->get("column"), $request->get("order") == "desc" ? "desc" : "asc")->paginate(20);

        return response()->json($storage);
    }

    public function searchMyStorage(OrderRequest $request, $searchString)
    {
        $user = Auth::user();
        $current_shop_id = $user->shop_id;

        $storage = Storage::where('shop_id', '=', $current_shop_id)
            ->whereHas('product', function (Builder $query) use ($searchString) {
                $query->where('name', 'like', '%' . $searchString . '%')
                    ->orWhere('type', 'like', '%' . $searchString . '%');
            })->orderBy($request->has("column") ?  $request->get("column") : "id", $request->get("order") == "desc" ? "desc" : "asc")->paginate(20);

        /*$storage = Storage::with("product")
            ->where([
                ['shop_id', '=', $current_shop_id],
                ['product->name', 'LIKE', '%' . $searchString . '%']
            ])->orWhere([
                ['shop_id', '=', $current_shop_id],
                ['product->type', 'LIKE', '%' . $searchString . '%']
            ])->paginate(20);*/

        return response()->json($storage);
    }

    public function add(StorageRequest $request)
    {
        $user = Auth::user();
        $current_shop_id = $user->shop_id;

        $storage = Storage::where('shop_id', $current_shop_id)
            ->where('product_id', $request->get("product_id"))
            ->where('expiration', $request->get("expiration"))
            ->first();

        if ($storage != null) {
            return response()->json("A megadott termék már szerepel a boltban, amennyiben ezen változtatni szeretne, használja a szerkesztés lehetőséget.", 409);
        }

        $storage = new Storage();
        $storage->shop_id = $current_shop_id;
        $storage->product_id = $request->get("product_id");
        $storage->amount = $request->get("amount");
        $storage->price = $request->get("price");
        $storage->expiration = $request->has("expiration") ? $request->get("expiration") : null;
        $storage->save();


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
        if ($request->get("amount") > 0) {
            $storage->is_deleted = false;
        }
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
    public function delete(Request $request)
    {
        foreach ($request->get("ids") as $item) {
            $storage = Storage::where('id', $item)->first();
            if ($storage->is_deleted == 0) {
                $user = Auth::user();
                $log = new Log();
                $product = DB::table("products")->where("id", '=', $storage->product_id)->first();
                $log->shop_id = $storage->shop_id;
                $log->user_id = $user->id;
                $log->description = "Törölt egy terméket a raktárból: "
                    . $product->name . " (" . $storage->amount . "), ár: "
                    . $storage->price . " Ft, lejárat: " . ($storage->expiration == null ?  "nincs" : $storage->expiration);
                $log->date = now();
                $log->save();

                $storage->amount = 0;
                $storage->is_deleted = true;
                $storage->save();
            };
        }
        return response()->json("Termékek sikeresen törölve a raktárból!");
    }
}
