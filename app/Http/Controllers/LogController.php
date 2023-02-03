<?php

namespace App\Http\Controllers;

use App\Http\Requests\LogRequest;
use App\Models\Log;
use Illuminate\Http\Request;
use Carbon\Carbon;

class LogController extends Controller
{
    public function index()
    {
        $logs = Log::with("user")->get();
        return response()->json($logs);
    }
    public function create(LogRequest $request)
    {
        $logs = new Log();
        $logs->shop_id = $request->get("shop_id");
        $logs->user_id = $request->get("user_id");
        $logs->description = $request->get("description");
        $logs->date = Carbon::now();
        $logs->save();
        return response()->json($logs->id);
    }
    public function delete(Log $log)
    {
        $log->delete();
        return response()->json("OK");
    }
}
