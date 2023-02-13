<?php

namespace App\Http\Controllers;

use App\Http\Requests\LogRequest;
use App\Models\Log;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class LogController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $logs = Log::with("user")->where('shop_id', $user->shop_id)->get();
        return response()->json($logs);
    }
}
