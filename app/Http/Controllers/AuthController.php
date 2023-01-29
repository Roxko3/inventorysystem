<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\PasswordChangeRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'A megadott email vagy jelszó helytelen'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        $user['password'] = "";
        return response(compact('user', 'token'));
    }

    public function changePassword(PasswordChangeRequest $request)
    {
        if (!Hash::check($request->get("old-password"), auth()->user()->password)) {
            return response()->json("A régi jelszó nem egyezik az ön jelszavával!");
        }

        User::whereId(auth()->user()->id)->update([
            'password' => Hash::make($request->get("new-password"))
        ]);

        return response()->json("Jelszó sikeresen megváltoztatva!");
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
