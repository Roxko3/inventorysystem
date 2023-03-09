<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageRequest;
use App\Http\Requests\NameEmailRequest;
use App\Http\Requests\PasswordChangeRequest;
use App\Http\Requests\CityRequest;
use App\Models\Log;
use App\Models\Shop;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function myProfile()
    {
        $user = auth()->user();
        $res = User::with('shop')->where('id', $user->id)->get();
        return response()->json($res);
    }

    public function nameEmail(NameEmailRequest $request)
    {
        $user = Auth::user();
        $user = User::where("id", $user->id)->first();
        $emailuser = User::where("email", $request->email)->first();

        if ($emailuser == null || $emailuser->id == $user->id) {
            $user->email = $request->get("email");
            $user->name = $request->get("name");
            $user->save();
            return response()->json("Felhasználói adatok sikeresen módosítva!");
        } else {
            return response()->json(['email' => 'A megadott email cím már használt!'], 409);
        }
    }

    public function passwordChange(PasswordChangeRequest $request)
    {
        $user = Auth::user();
        $user = User::whereId($user->id)->first();
        if (!Hash::check($request->get("old-password"), $user->password)) {
            return response()->json(['old-password' => 'A régi jelszó nem egyezik az ön jelszavával!'], 422);
        }

        if (Hash::check($request->get("new-password"), $user->password)) {
            return response()->json(['new-password' => ['Az új jelszó nem egyezhet az ön jelenlegi jelszavával!']], 422);
        }

        User::whereId($user->id)->update([
            'password' => Hash::make($request->get("new-password"))
        ]);

        return response()->json("Jelszó sikeresen megváltoztatva!");
    }

    public function cityChange(CityRequest $request)
    {
        $user = Auth::user();
        $user = User::where('id', $user->id)->first();
        $user->city = $request->has("city") ? $request->get("city") : null;

        $user->save();
        return response()->json("Város sikeresen megváltoztatva!");
    }

    public function uploadImage(ImageRequest $request)
    {
        $user = Auth::user();
        $user = User::where("id", $user->id)->first();

        if ($user->image_path != null && file_exists(public_path() . "/storage/" . $user->image_path)) {
            unlink(public_path() . "/storage/" . $user->image_path);
        }
        $newImageName = time() .
            '-' .
            $request->file('image')->getClientOriginalName();
        $request->file("image")
            ->move(storage_path('app/public'), $newImageName);
        $user->image_path = $newImageName;
        $user->save();

        return response()->json("Kép feltöltés sikeres!");
    }

    public function deleteImage()
    {
        $user = Auth::user();
        $user = User::where("id", $user->id)->first();

        if ($user->image_path != null && file_exists(public_path() . "/storage/" . $user->image_path)) {
            unlink(public_path() . "/storage/" . $user->image_path);
            $user->image_path = null;
            $user->save();
            return response()->json("Kép sikeresen törölve!");
        } else {
            return response()->json("Nem található kép ennél a felhasználónál!", 404);
        }
    }

    public function deleteProfile(Request $request)
    {
        $user = $request->user();
        if (Gate::allows('shop-owner')) {
            $shop = Shop::where('id', $user->shop_id)->first();
            (new ShopController)->delete($shop);
        }
        $user->currentAccessToken()->delete();
        $user->shop_id = null;
        $user->permission = null;
        $user->is_deleted = true;
        $user->save();

        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('Felhasználói fiók sikeresen törölve', 200);
    }

    public function leaveShop()
    {
        $user = Auth::user();
        $user = User::where('id', $user->id)->first();

        if ($user->shop_id == null) {
            return response()->json("Nem tartozik egy bolthoz sem", 403);
        }

        if (Gate::allows('shop-owner')) {
            return response()->json("A bolt tulajdonosa nem hagyhatja el a boltot, kérjük adja át másnak a tulajdonos jogot a bolt dolgozói közül!", 403);
        }

        $log = new Log();
        $log->shop_id = $user->shop_id;
        $log->user_id = $user->id;
        $log->description = $user->name . " elhagyta a boltot";
        $log->date = Carbon::now()->addHour(1);
        $log->save();

        $user->shop_id = null;
        $user->permission = 0;
        $user->save();

        return response()->json("Sikeresen kilépett a boltból!");
    }
}
