<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function index()
    {
        $users = User::with("shop")->get();
        return response()->json($users);
    }

    public function myProfile()
    {
        $user = auth()->user();
        $res = User::with('shop')->where('id', $user->id)->get();
        return response()->json($res);
    }

    public function create(UserRequest $request)
    {
        $user = new User();

        $user->email = $request->get("email");
        $user->name = $request->get("name");
        $user->password = Hash::make($request->get("password"));
        $user->permission = $request->has("permission") ? $request->get("permission") : null;
        $user->postal_code = $request->has("postal_code") ? $request->get("postal_code") : null;
        $user->shop_id = $request->has("shop_id") ? $request->get("shop_id") : null;

        $user->save();
        return response()->json($user->id);
    }

    public function update(User $user, UserRequest $request)
    {
        $user->email = $request->get("email");
        $user->name = $request->get("name");
        $user->password = Hash::make($request->get("password"));
        $user->permission = $request->has("permission") ? $request->get("permission") : null;
        $user->postal_code = $request->has("postal_code") ? $request->get("postal_code") : null;
        $user->shop_id = $request->has("shop_id") ? $request->get("shop_id") : null;

        $user->save();
        return response()->json($user->toArray());
    }

    public function delete(User $user)
    {
        $user->delete();
        return response()->json("OK");
    }
}
