<?php

namespace App\Http\Controllers;

use App\Http\Requests\WorkerRequest;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class WorkerController extends Controller
{
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
        $worker->permission = $request->get("permission");

        $worker->save();
        return response()->json("Dolgozó módosítás sikeresen felvéve!");
    }

    public function delete(WorkerRequest $request)
    {
        $user = Auth::user();

        if (Gate::denies('shop-owner')) {
            abort(403);
        }

        $worker = User::where('email', $request->get("email"))->first();
        if ($worker->shop_id != $user->shop_id) {
            return response()->json(['email' => 'A megadott felhasználó nem ehhez a bolthoz tartozik!'], 409);
        }
        $worker->permission = 0;
        $worker->shop_id = null;

        $worker->save();
        return response()->json("Dolgozó sikeresen törölve!");
    }
}
