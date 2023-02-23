<?php

namespace App\Http\Controllers;

use App\Http\Requests\OpeningHoursRequest;
use App\Models\Log;
use App\Models\OpeningHour;
use App\Models\Shop;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use InvalidArgumentException;

class OpeningHoursController extends Controller
{
    public function getOpeningHours(Shop $shop)
    {
        $openinghours = OpeningHour::where('shop_id', $shop->id)->orderBy('id')->get();

        return response()->json($openinghours);
    }

    public function updateOpeningHours(Shop $shop, OpeningHoursRequest $request)
    {
        if (Gate::denies('shop-worker', $shop->id) || Gate::denies('shop-manager', $shop)) {
            return response()->json("Csak a megfelelő jogokkal lehet módosítani a bolt adatain!", 403);
        }

        $daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        $daysOfWeekHungary = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'];

        $user = Auth::user();

        $log = new Log();
        $log->shop_id = $shop->id;
        $log->user_id = $user->id;
        $changedDatas = "";

        foreach ($request->get('opening_hours') as $day => $hours) {
            if (!in_array(strtolower($day), $daysOfWeek)) {
                return response()->json("Kérem adja meg a hét napját és nyitási, illetve zárási időt!", 422);
            }

            $opening = OpeningHour::where('shop_id', $shop->id)->where('day', 'LIKE', $day)->first();
            $dayhungary = $daysOfWeekHungary[array_search($day, $daysOfWeek)];

            try {
                $parsedopen = Carbon::parse($hours['open_time'], 'UTC')->format('H:i');
                $parsedclose = Carbon::parse($hours['close_time'], 'UTC')->format('H:i');
                //$parsedopen->format('H:i') != $hours['open_time'] || $parsedclose->format('H:i') != $hours['close_time'] || 
                if ($hours['open_time'] == 0 || $hours['close_time'] == 0) {
                    throw new InvalidArgumentException();
                } else {
                    if ($opening->is_open) {
                        $changedDatas .= "- $dayhungary: $opening->open - $opening->close -> $parsedopen - $parsedclose ";
                    } else {
                        $changedDatas .= "- $dayhungary: Zárva -> $parsedopen - $parsedclose ";
                    }
                    $opening->is_open = 1;
                    $opening->open = $parsedopen;
                    $opening->close = $parsedclose;
                }
            } catch (InvalidArgumentException $e) {
                if ($opening->is_open) {
                    $changedDatas .= "- $dayhungary: $opening->open - $opening->close -> Zárva ";
                } else {
                    $changedDatas .= "- $dayhungary: Zárva -> Zárva ";
                }
                $opening->is_open = 0;
                $opening->open = null;
                $opening->close = null;
            }
            $opening->save();
        }

        $log->description = $user->name . " módosította a bolt nyitvatartását " . $changedDatas;
        $log->date = Carbon::now()->addHour(1);
        $log->save();

        return response()->json("Nyitvatartás sikeresen módosítva!");
    }
}
