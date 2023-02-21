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

class ForgotPasswordController extends Controller
{
    public function ForgetPassword(Request $request)
      {
          $request->validate([
              'email' => 'required|email|exists:users',
          ]);
  
          $token = Str::random(64);
          $user = \App\Models\User::query()
          ->where([
            'email' => $request->email,]) ->first();

          DB::table('password_resets')->insert([
              'email' => $request->email, 
              'token' => $token, 
              'created_at' => Carbon::now()
            ]);
            
            $passord = [
                'greeting' => 'Hello '.$user->name.',',
                'body' => 'Ez a jelszó visszaálitó E-mail.',
                'thanks' => 'köszönjök hogy minket választotak InventorySystem csapata.',
                'actionText' => 'Jelszó visszaálitás',
                'actionURL' => url('/api/reset-password?token='.$token),
            ];
           
            $user->notify(new PasswordResetEmail($passord));
          return ['message'=>'Email has been sent'];
      }
      public function ResetPassword(Request $request)
      {
          $request->validate([
              'token' =>  'required',
              'email' => 'required|email|exists:users',
              'password' => 'required|string|min:8',
              
          ]);
  
          $updatePassword = DB::table('password_resets')
                              ->where([
                                'email' => $request->email, 
                                'token' => $request->token
                              ])
                              ->first();
  
         
  
          $user = User::where('email', $request->email)
                      ->update(['password' => Hash::make($request->password)]);
 
          DB::table('password_resets')->where(['email'=> $request->email])->delete();
  
          return ['message', 'Az jelszod megváltozot!'];
      }
     
}
