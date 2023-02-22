<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageRequest;
use App\Http\Requests\NameEmailRequest;
use App\Http\Requests\PasswordChangeRequest;
use App\Http\Requests\PostalCodeRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        if (!Hash::check($request->get("old-password"), auth()->user()->password)) {
            return response()->json(['old-password' => 'A régi jelszó nem egyezik az ön jelszavával!'], 422);
        }

        User::whereId(auth()->user()->id)->update([
            'password' => Hash::make($request->get("new-password"))
        ]);

        return response()->json("Jelszó sikeresen megváltoztatva!");
    }

    public function postalCodeChange(PostalCodeRequest $request)
    {
        $user = Auth::user();
        $user = User::where('id', $user->id)->first();
        $user->postal_code = $request->has("postal_code") ? $request->get("postal_code") : null;

        $user->save();
        return response()->json("Irányítószám sikeresen megváltoztatva!");
    }

    public function uploadImage(ImageRequest $request)
    {
        $user = Auth::user();
        $user = User::where("id", $user->id)->first();

        if ($user->image_path != null && file_exists(public_path() . "\\storage\\" . $user->image_path)) {
            unlink(public_path() . "\\storage\\" . $user->image_path);
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

        if ($user->image_path != null && file_exists(public_path() . "\\storage\\" . $user->image_path)) {
            unlink(public_path() . "\\storage\\" . $user->image_path);
            $user->image_path = null;
            $user->save();
            return response()->json("Kép sikeresen törölve!");
        } else {
            return response()->json("Nem található kép ennél a felhasználónál!");
        }
    }
}
