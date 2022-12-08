<?php

namespace App\Http\Controllers;

use App\Http\Requests\LogRequest;
use App\Models\Log;
use Illuminate\Http\Request;
use Carbon\Carbon;

class LogController extends Controller
{
    public function indexlog()
    {
        $logs = Log::with("user", "shop")->get();
        return response()->json($logs);
    }
    public function createlog(LogRequest $request)
    {
        $logs = new Log();
        $logs->shop_id = $request->get("shop_id");
        $logs->user_id = $request->get("user_id");
        $logs->description = $request->get("description");
        $logs->date = Carbon::now();
        $logs->save();
        return response()->json($logs->id);
    }
    public function deletelog(Log $log)
    {
        $log->delete();
        return response()->json("OK");
    }
}
