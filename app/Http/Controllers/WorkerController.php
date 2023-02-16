<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkerRequest;
use App\Http\Requests\WorkerSearchRequest;
use App\Models\Log;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class WorkerController extends Controller
{
    public function workers(Shop $shop)
    {
        if (Gate::denies('shop-worker', $shop->id)) {
            abort(403);
        }
        $workers = User::where("shop_id", $shop->id)->get();
        return response()->json($workers);
    }

    public function searchWorkers(WorkerSearchRequest $request, Shop $shop)
    {
        if (Gate::denies('shop-worker', $shop->id)) {
            abort(403);
        }
        if ($request->get("column") == null) {
            $ordercolumn = "id";
        } else {
            $ordercolumn = $request->get("column");
        }
        $workers = User::where('shop_id', $shop->id)
            ->where(function ($query) use ($request) {
                $query->where('email', 'like', '%' . $request->get("searchString") . '%')
                    ->orWhere('name', 'like', '%' . $request->get("searchString") . '%')
                    ->orWhere('permission', 'like', '%' . $request->get("searchString") . '%')
                    ->orWhere('postal_code', 'like', '%' . $request->get("searchString") . '%');
            })
            ->orderBy($ordercolumn, $request->get("order") == "desc" ? "desc" : "asc")
            ->paginate(20);
        return response()->json($workers);
    }

    public function add(WorkerRequest $request)
    {
        $user = Auth::user();

        if (Gate::denies('shop-manager')) {
            abort(403);
        }

        if ($user->email == $request->get("email")) {
            return response()->json(['email' => 'Kérem más email címét adja meg!'], 409);
        }

        $worker = User::where('email', $request->get("email"))->first();
        if ($worker->shop_id == $user->shop_id) {
            return response()->json(['email' => 'A megadott felhasználó már a bolthoz tartozik!'], 409);
        } else {
            if ($worker->shop_id != null) {
                return response()->json(['email' => 'A megadott felhasználó már egy másik bolthoz tartozik!'], 409);
            }
        }
        $worker->shop_id = $user->shop_id;
        $worker->permission = $request->get("permission");

        $log = new Log();
        $log->shop_id = $user->shop_id;
        $log->user_id = $user->id;
        $log->description = $user->name . " felvett egy felhasználót a boltba: "
            . $worker->name . " - jogosultsága: " . $worker->permission;
        $log->date = now();
        $log->save();

        $worker->save();
        return response()->json("Dolgozó sikeresen felvéve!");
    }

    public function update(WorkerRequest $request)
    {
        $user = Auth::user();

        if (Gate::denies('shop-manager')) {
            abort(403);
        }

        if ($user->email == $request->get("email")) {
            return response()->json(['email' => 'Kérem más email címét adja meg!'], 409);
        }

        $worker = User::where('email', $request->get("email"))->first();
        if ($worker->shop_id != $user->shop_id) {
            return response()->json(['email' => 'A megadott felhasználó nem ehhez a bolthoz tartozik!'], 409);
        }

        $log = new Log();
        $log->shop_id = $user->shop_id;
        $log->user_id = $user->id;
        $log->description = $user->name . " módosította " . $worker->name . " jogosultságait: "
            . $worker->permission . " -> " . $request->get("permission");
        $log->date = now();
        $log->save();

        $worker->permission = $request->get("permission");

        $worker->save();
        return response()->json("Dolgozó módosítás sikeresen felvéve!");
    }

    public function delete(Request $request)
    {
        $user = Auth::user();

        if (Gate::denies('shop-owner')) {
            abort(403);
        }

        foreach ($request->get("emails") as $item) {
            if ($user->email == $item) {
                return response()->json(['email' => 'Kérem más email címét adja meg!'], 409);
            }

            $deleteuser = User::where('email', $item)->first();
            if ($deleteuser == null) {
                return response()->json(['email' => 'Nem található felhasználó a megadott email címmel (' . $deleteuser->email . ')!'], 404);
            }
            if ($deleteuser->shop_id != $user->shop_id) {
                return response()->json(['email' => 'A megadott felhasználó (' . $deleteuser->email . ') nem ehhez a bolthoz tartozik!'], 409);
            }
            $user = Auth::user();
            $log = new Log();
            $log->shop_id = $user->shop_id;
            $log->user_id = $user->id;
            $log->description = $user->name . " törölt egy felhasználót a boltból: "
                . $deleteuser->name;
            $log->date = now();
            $log->save();

            $deleteuser->shop_id = null;
            $deleteuser->permission = 0;
            $deleteuser->save();
        }
        return response()->json("Dolgozók sikeresen törölve!");
    }
}
