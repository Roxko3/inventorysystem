<?php

namespace App\Http\Controllers;

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
}
