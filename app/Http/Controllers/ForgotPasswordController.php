<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Carbon\Carbon; 
use App\Models\User; 
use Illuminate\Support\Str;
use App\Notifications\PasswordResetEmail;
use App\Http\Requests\ForgotPassord;
use App\Http\Requests\PasswordReset;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ForgotPasswordController extends Controller
{

      public function ForgetPassword(ForgotPassord $request)
      {
        $token = Str::random(64);
        if (DB::table('Tokens')->where('email', '=', $request->email)->exists()) {
          DB::table('Tokens')
            ->where('email', 'LIKE', $request->email)
            ->update(['tokenPassword' =>  $token, 'created_atPassword' => Carbon::now()->addHour()]);
        } else {
          DB::table('Tokens')->insert([
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
                'greeting' => 'Hello '.$user->name.',',
                'body' => 'Ez a jelszó visszaállító E-mail.',
                'thanks' => 'Köszönjük, hogy minket választottak, InventorySystem csapata.',
                'actionText' => 'Jelszó visszaállítás',
                'actionURL' => url('/InventorySystem/public/forgotpass?token='.$token),
            ];
           
            $user->notify(new PasswordResetEmail($password));
          return ['message'=>'Email el lett küldve.'];
      }
      public function ResetPassword(PasswordReset $request)
      {
        $email = DB::table('Tokens')
        ->where([
        'tokenPassword' => $request->token
        ])
        -> value('email');
        if ($request->password == User::where('email', $email)->value('password')) {
          return ['password'=> 'A jelszód nem lehet a már meglévő!',422];
        }
        else { User::where('email', $email)
          ->update(['password' => Hash::make($request->password)]);
   
          DB::table('Tokens')->where(['email'=> $email])->update(['tokenPassword' =>  null, 'created_atPassword' => null]);
          return ['message', 'A jelszód megváltozot!'];}
      }
     
}
