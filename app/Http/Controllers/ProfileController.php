<?php

namespace App\Http\Controllers;

use App\Http\Requests\NameEmailRequest;
use App\Http\Requests\PasswordChangeRequest;
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
        $user = User::whereId($user->id);
        $emailuser = User::where('email', $request->email)->first();

        if ($emailuser->id != $user->id) {
            return response()->json("A megadott email cím már használt!");
        }

        $user->email = $request->get("email");
        $user->name = $request->get("name");

        $user->save();
        return response()->json("Felhasználói adatok sikeresen módosítva!");
    }

    public function passwordChange(PasswordChangeRequest $request)
    {
        if (!Hash::check($request->get("old-password"), auth()->user()->password)) {
            return response()->json("A régi jelszó nem egyezik az ön jelszavával!");
        }

        User::whereId(auth()->user()->id)->update([
            'password' => Hash::make($request->get("new-password"))
        ]);

        return response()->json("Jelszó sikeresen megváltoztatva!");
    }
}
