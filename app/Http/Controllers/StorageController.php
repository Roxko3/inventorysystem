<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorageSearchRequest;
use App\Http\Requests\StorageRequest;
use App\Http\Requests\UpdateStorageRequest;
use App\Models\Log;
use App\Models\Shop;
use App\Models\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Gate;
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
        $storage = DB::table('storages')
            ->join('products', 'storages.product_id', '=', 'products.id')
            ->where('storages.shop_id', $shop->id)
            ->select('*')
            ->paginate(20);
        return response()->json($storage);
    }

    public function searchStorage(StorageSearchRequest $request, Shop $shop)
    {
        if ($request->get("is_deleted") === "0" || $request->get("is_deleted") === "1") {
            $delete1 = $request->get("is_deleted");
            $delete2 = $request->get("is_deleted");
        } else {
            $delete1 = 0;
            $delete2 = 1;
        }
        if ($request->get("column") == "name" || $request->get("column") == "type" || $request->get("column") == "packaging" || $request->get("column") == "unit_of_measure" || $request->get("column") == "type") {
            $ordercolumn = "products." . $request->get("column");
            $storage = DB::table('storages')
                ->select('storages.*', 'products.name', 'products.packaging', 'products.unit_of_measure', 'products.type')
                ->join('products', 'storages.product_id', '=', 'products.id')
                ->where('storages.shop_id', $shop->id)
                ->where(function ($query) use ($delete1, $delete2) {
                    $query->where('storages.is_deleted', $delete1)
                        ->orWhere('storages.is_deleted', $delete2);
                })
                ->where(function ($query) use ($request) {
                    $query->where('products.name', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('storages.amount', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('storages.price', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('storages.expiration', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('products.packaging', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('products.unit_of_measure', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('products.type', 'like', '%' . $request->get("searchString") . '%');
                })
                ->orderBy($ordercolumn, $request->get("order") == "desc" ? "desc" : "asc")
                ->paginate(10);
        } else {
            if ($request->get("column") == null || $request->get("column") == "edit") {
                $ordercolumn = "storages.id";
            } else {
                if ($request->get("column") == "stock") {
                    $ordercolumn = "amount";
                } {
                    $ordercolumn = "storages." . $request->get("column");
                }
            }
            $storage = DB::table('storages')
                ->select('storages.*', 'products.name', 'products.packaging', 'products.unit_of_measure', 'products.type')
                ->join('products', 'storages.product_id', '=', 'products.id')
                ->where('storages.shop_id', $shop->id)
                ->where(function ($query) use ($delete1, $delete2) {
                    $query->where('storages.is_deleted', $delete1)
                        ->orWhere('storages.is_deleted', $delete2);
                })
                ->where(function ($query) use ($request) {
                    $query->where('products.name', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('storages.amount', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('storages.price', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('storages.expiration', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('products.packaging', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('products.unit_of_measure', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('products.type', 'like', '%' . $request->get("searchString") . '%');
                })
                ->orderBy($ordercolumn, $request->get("order") == "desc" ? "desc" : "asc")
                ->paginate(10);
        }
        return response()->json($storage);
    }

    public function add(StorageRequest $request)
    {
        $user = Auth::user();

        if (Gate::denies('shop-cashier')) {
            return response()->json("Csak a megfelelő jogokkal lehet hozzáadni terméket a bolthoz!", 403);
        }

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
        $log->date = Carbon::now()->addHour(1);
        $log->save();

        return response()->json($storage->id);
    }

    public function update(Storage $storage, StorageRequest $request)
    {
        if (Gate::denies('shop-cashier') || Gate::denies('shop-worker', $storage->shop_id)) {
            return response()->json("Csak a megfelelő jogokkal lehet szerkeszteni a bolt termékein!", 403);
        }
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
        $log->date = Carbon::now()->addHour(1);
        $log->save();

        return response()->json($storage->toArray());
    }
    public function delete(Request $request)
    {
        if (Gate::denies('shop-cashier')) {
            return response()->json("Csak a megfelelő jogokkal lehet törölni terméket a boltból!", 403);
        }
        foreach ($request->get("ids") as $item) {
            $storage = Storage::where('id', $item)->first();

            //Más boltjához tartozik-e a termék
            if (Gate::denies('shop-worker', $storage->shop_id)) {
                return response()->json("Csak a megfelelő jogokkal lehet törölni terméket a boltból!", 403);
            }

            if ($storage->is_deleted == 0) {
                $user = Auth::user();
                $log = new Log();
                $product = DB::table("products")->where("id", '=', $storage->product_id)->first();
                $log->shop_id = $storage->shop_id;
                $log->user_id = $user->id;
                $log->description = "Törölt egy terméket a raktárból: "
                    . $product->name . " (" . $storage->amount . "), ár: "
                    . $storage->price . " Ft, lejárat: " . ($storage->expiration == null ?  "nincs" : $storage->expiration);
                $log->date = Carbon::now()->addHour(1);
                $log->save();

                $storage->amount = 0;
                $storage->is_deleted = true;
                $storage->save();
            };
        }
        return response()->json("Termékek sikeresen törölve a raktárból!");
    }
}
