<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use App\Http\Requests\EmailVerify;
use App\Notifications\EmailVerifyMail;
use Illuminate\Support\Str;
use Mail; 
use Hash;
use DB; 
use Carbon\Carbon; 
use App\Models\User; 
use App\Http\Requests\EmailVerifyTokenRequest;

class EmailVerificationController extends Controller
{
   
    public function EmailVerifyMail(EmailVerify $request)
    {
        
        if (DB::table('users')->where('email', '=', $request->email)->value('email_verified_at')===null)
        {
            $token = Str::random(64);
            if (DB::table('Tokens')->where('email', '=', $request->email)->exists()) 
            {
                DB::table('Tokens')
                ->where('email','LIKE', $request->email)
                ->update(['tokenEmail' =>  $token, 'created_atEmail' => Carbon::now()->addHour()]);
            } 
            else 
            {
                DB::table('Tokens')->insert([
                    'email' => $request->email, 
                    'tokenEmail' => $token, 
                    'created_atEmail' => Carbon::now()->addHour()
                ]);
            }
       
        $user = \App\Models\User::query()
        ->where([
          'email' => $request->email,]) ->first();
          $verify = [
              'greeting' => 'Hello '.$user->name.',',
              'body' => 'E-mail megerősítő.',
              'thanks' => 'Köszönjűk, hogy minket választottak, InventorySystem csapata.',
              'actionText' => 'E-mail megerősítés.',
              'actionURL' => url('/api/verify-email?tokenEmail='.$token),
          ];
         
          $user->notify(new EmailVerifyMail($verify));
        return ['message'=>'Email el lett küldve.'];
        } 
        else 
        {
            return ['message'=>'Az Email már megvan erösitve.'];
        }
       
    }
   
    public function EmailVerify(EmailVerifyTokenRequest $request)
    {
        

        $email = DB::table('Tokens')
          ->where([
          'tokenEmail' => $request->tokenEmail
            ])
            -> value('email');
      
        $user = User::where('email', $email)
                    ->update(['email_verified_at' => Carbon::now()->addHour()]);

        DB::table('Tokens')->where(['email'=> $email])->update(['tokenEmail' =>  null, 'created_atEmail' => null]);;

        return ['message'=> 'Az Email megerősitve!'];
    }

}
