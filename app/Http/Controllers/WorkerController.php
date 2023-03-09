<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkerRequest;
use App\Http\Requests\WorkerSearchRequest;
use App\Models\Log;
use App\Models\Shop;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class WorkerController extends Controller
{
    public function workers(Shop $shop)
    {
        if (Gate::denies('shop-worker', $shop->id)) {
            return response()->json("Csak a bolt dolgozói kérhetik le a bolt dolgozóit!", 403);
        }
        $workers = User::where("shop_id", $shop->id)->get();
        return response()->json($workers);
    }

    public function searchWorkers(WorkerSearchRequest $request, Shop $shop)
    {
        if (Gate::denies('shop-worker', $shop->id)) {
            return response()->json("Csak a bolt dolgozói kérhetik le a bolt dolgozóit!", 403);
        }
        if ($request->get("column") == null || $request->get("column") == "edit") {
            $ordercolumn = "id";
        } else {
            $ordercolumn = $request->get("column");
        }
        $workers = User::where('shop_id', $shop->id)
            ->where(function ($query) use ($request) {
                $query->where('email', 'like', '%' . $request->get("searchString") . '%')
                    ->orWhere('name', 'like', '%' . $request->get("searchString") . '%')
                    ->orWhere('permission', 'like', '%' . $request->get("searchString") . '%')
                    ->orWhere('city', 'like', '%' . $request->get("searchString") . '%');
            })
            ->orderBy($ordercolumn, $request->get("order") == "desc" ? "desc" : "asc")
            ->paginate(10);
        return response()->json($workers);
    }

    public function add(WorkerRequest $request)
    {
        $user = Auth::user();

        if (Gate::denies('shop-manager')) {
            return response()->json("Csak a megfelelő jogokkal lehet hozzáadni dolgozót a bolthoz!", 403);
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
        $log->date = Carbon::now()->addHour(1);
        $log->save();

        $worker->save();
        return response()->json("Dolgozó sikeresen felvéve!");
    }

    public function update(WorkerRequest $request)
    {
        $user = Auth::user();

        if (Gate::denies('shop-manager')) {
            return response()->json("Csak a megfelelő jogokkal lehet változatni a dolgozók jogain!", 403);
        }

        $owner = User::where('shop_id', $user->shop_id)->where("permission", 10)->first();
        if ($user->email == $request->get("email") || $request->get("email") == $owner->email) {
            return response()->json(['email' => 'Kérem más email címét adja meg!'], 409);
        }

        $worker = User::where('email', $request->get("email"))->first();
        if ($worker->shop_id != $user->shop_id) {
            return response()->json(['email' => 'A megadott felhasználó nem ehhez a bolthoz tartozik!'], 409);
        }

        if ($request->get("permission") == 10 && Gate::allows('shop-owner')) {
            $worker->permission = 10;
            $worker->save();

            $user = User::where('id', $user->id)->first();
            $user->permission = 5;
            $user->save();

            $log = new Log();
            $log->shop_id = $user->shop_id;
            $log->user_id = $user->id;
            $log->description = "A bolt tulajdonosa megváltozott: " . $user->name . " -> " . $worker->name;
            $log->date = Carbon::now()->addHour(1);
            $log->save();

            return response()->json("Bolt sikeresen átadva!");
        } else {

            $log = new Log();
            $log->shop_id = $user->shop_id;
            $log->user_id = $user->id;
            $log->description = $user->name . " módosította " . $worker->name . " jogosultságait: "
                . $worker->permission . " -> " . $request->get("permission");
            $log->date = Carbon::now()->addHour(1);
            $log->save();

            $worker->permission = $request->get("permission");

            $worker->save();

            return response()->json("Dolgozó módosítás sikeresen felvéve!");
        }
    }

    public function delete(Request $request)
    {
        $user = Auth::user();

        if (Gate::denies('shop-owner')) {
            return response()->json("Csak a bolt létrehozója tud dolgozókat törölni!", 403);
        }

        foreach ($request->get("emails") as $item) {
            if ($user->email == $item) {
                return response()->json(['email' => 'Kérem más email címét adja meg!'], 409);
            }

            $deleteuser = User::where('email', $item)->first();
            if ($deleteuser == null) {
                return response()->json(['email' => 'Nem található felhasználó a megadott email címmel (' . $item . ')!'], 404);
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
            $log->date = Carbon::now()->addHour(1);
            $log->save();

            $deleteuser->shop_id = null;
            $deleteuser->permission = 0;
            $deleteuser->save();
        }
        return response()->json("Dolgozók sikeresen törölve!");
    }
}
