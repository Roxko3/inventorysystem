<?php

namespace App\Http\Middleware;

use App\Models\Shop;
use Closure;
use Illuminate\Http\Request;

class CheckShopIsDeleted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $shop = Shop::where('id', $request->route('shop')->id)->where('is_deleted', false)->first();

        if (!$shop) {
            return response()->json(['message' => 'A bolt nem található'], 404);
        }
        return $next($request);
    }
}
