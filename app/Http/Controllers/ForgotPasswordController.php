<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request; 
use DB; 
use Carbon\Carbon; 
use App\Models\User; 
use Mail; 
use Hash;
use Notification;
use Illuminate\Support\Str;
use App\Notifications\PasswordResetEmail;
use App\Http\Requests\ForgotPassord;
use App\Http\Requests\PasswordReset;

class ForgotPasswordController extends Controller
{
 
    public function ForgetPassword(ForgotPassord $request)
      {
         
          DB::table('password_resets')->where(['email'=> $request->email])->delete();
          $token = Str::random(64);
          $user = \App\Models\User::query()
          ->where([
            'email' => $request->email,]) ->first();

          DB::table('password_resets')->insert([
              'email' => $request->email, 
              'token' => $token, 
              'created_at' => Carbon::now()->addHour()
            ]);
            
            $passord = [
                'greeting' => 'Hello '.$user->name.',',
                'body' => 'Ez a jelszó visszaálitó E-mail.',
                'thanks' => 'Köszönjök hogy minket választotak InventorySystem csapata.',
                'actionText' => 'Jelszó visszaálitás',
                'actionURL' => url('/InventorySystem/public/forgotpass?token='.$token),
            ];
           
            $user->notify(new PasswordResetEmail($passord));
          return ['message'=>'Email el lett küldve.'];
      }
      public function ResetPassword(PasswordReset $request)
      {
          
  
          $email = DB::table('password_resets')
            ->where([
            'token' => $request->token
              ])
              -> value('email');
  
          
  
          $user = User::where('email', $email)
                      ->update(['password' => Hash::make($request->password)]);
 
          DB::table('password_resets')->where(['email'=> $email])->delete();
  
          return ['message', 'Az jelszod megváltozot!'];
      }
     
}
