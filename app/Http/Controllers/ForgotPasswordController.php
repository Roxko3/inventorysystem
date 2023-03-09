<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Str;
use App\Notifications\PasswordResetEmail;
use App\Http\Requests\ForgotPassord;
use App\Http\Requests\PasswordReset;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ForgotPasswordController extends Controller
{

  public function ForgetPassword(ForgotPassord $request)
  {
    $token = Str::random(64);
    if (DB::table('tokens')->where('email', '=', $request->email)->exists()) {
      DB::table('tokens')
        ->where('email', 'LIKE', $request->email)
        ->update(['tokenPassword' =>  $token, 'created_atPassword' => Carbon::now()->addHour()]);
    } else {
      DB::table('tokens')->insert([
        'email' => $request->email,
        'tokenPassword' => $token,
        'created_atPassword' => Carbon::now()->addHour()
      ]);
    }

    $user = \App\Models\User::query()
      ->where([
        'email' => $request->email,
      ])->first();

    $password = [
      'greeting' => 'Hello ' . $user->name . ',',
      'body' => 'Az alábbi gombra kattintva tudja elfelejtett jelszavát megváltoztatni:',
      'thanks' => 'Köszönjük, hogy minket választott,',
      'actionText' => 'Jelszó visszaállítás',
      'actionURL' => url('InventorySystem/public/forgotpass?token=' . $token),
    ];

    $user->notify(new PasswordResetEmail($password));
    return ['message' => 'E-mail sikeresen elküldve.'];
  }

  public function ResetPassword(PasswordReset $request)
  {
    $email = DB::table('tokens')
      ->where([
        'tokenPassword' => $request->token
      ])
      ->value('email');

    if (Hash::check($request->password, User::where('email', $email)->value('password'))) {
      return response(['password' => ['Az új jelszó nem egyezhet az ön jelenlegi jelszavával!']], 409);
    } else {
      User::where('email', $email)
        ->update(['password' => Hash::make($request->password)]);

      DB::table('tokens')->where(['email' => $email])->update(['tokenPassword' =>  null, 'created_atPassword' => null]);
      return ['message', 'Jelszó sikeresen megváltoztatva!'];
    }
  }
}
