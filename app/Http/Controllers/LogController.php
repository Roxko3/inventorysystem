<?php

namespace App\Http\Controllers;

use App\Http\Requests\LogSearchRequest;
use App\Models\Log;
use App\Models\Shop;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class LogController extends Controller
{
    public function index(Shop $shop)
    {
        if (Gate::denies('shop-worker', $shop->id)) {
            return response()->json("Csak a bolt dolgozói kérhetik le a bolt naplóját!", 403);
        }
        $logs = Log::with("user")->where('shop_id', $shop->id)->get();
        return response()->json($logs);
    }

    public function searchLogs(LogSearchRequest $request, Shop $shop)
    {
        if ($request->get("column") == "name") {
            $storage = DB::table('logs')
                ->select('logs.*')
                ->join('users', 'logs.user_id', '=', 'users.id')
                ->where('logs.shop_id', $shop->id)
                ->where(function ($query) use ($request) {
                    $query->where('users.name', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('logs.description', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('logs.date', 'like', '%' . $request->get("searchString") . '%');
                })
                ->orderBy('users.name', $request->get("order") == "desc" ? "desc" : "asc")
                ->paginate(20);
        } else {
            if ($request->get("column") == null) {
                $ordercolumn = "logs.id";
            } else {
                $ordercolumn = "logs." . $request->get("column");
            }
            $storage = DB::table('logs')
                ->select('logs.*')
                ->join('users', 'logs.user_id', '=', 'users.id')
                ->where('logs.shop_id', $shop->id)
                ->where(function ($query) use ($request) {
                    $query->where('users.name', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('logs.description', 'like', '%' . $request->get("searchString") . '%')
                        ->orWhere('logs.date', 'like', '%' . $request->get("searchString") . '%');
                })
                ->orderBy($ordercolumn, $request->get("order") == "desc" ? "desc" : "asc")
                ->paginate(20);
        }
        return response()->json($storage);
    }
}
