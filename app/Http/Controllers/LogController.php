<?php

namespace App\Http\Controllers;

use App\Http\Requests\LogRequest;
use App\Models\Log;
use App\Models\Shop;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
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
}
