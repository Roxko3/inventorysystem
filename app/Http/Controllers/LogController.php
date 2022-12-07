<?php

namespace App\Http\Controllers;

use App\Http\Requests\LogRequest;
use App\Models\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function indexlog()
    {
        $logs = Log::with("user", "shop")->get() ;
        
        
        
       
        return response()->json($logs);
    }
    public function createlog(LogRequest $request)
    {
        $logs = new log();
        $logs->shop_id = $request->get("shop_id");
        $logs->user_name = $request->get("user_name");
        $logs->description= $request->get("description");
        $logs->date= $request->get("date");
        $logs->save();
        return response()->json($logs->id);
    }
    public function updatelog(Log $logs, LogRequest $request)
    {
        
        $logs->shop_id = $request->get("shop_id");
        $logs->user_name = $request->get("user_name");
        $logs->description= $request->get("description");
        $logs->date= $request->get("date");
        $logs->save();
        return response()->json($logs->toArray());
    }
    public function deletelog(Log $log ) 
    {
    $log->delete();
    return response()->json("OK");
    }
    
}
