<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\InviteRequest;
use Notification;
use App\Notifications\InviteMail;
use DB; 
use Auth;

class InviteController extends Controller
{
   
    public function SendInvite(InviteRequest $request)

    {
        $user = Auth::user();
       
        
        $invite = [
        'greeting' => 'Hello '.$request->email,
        'body' => $user->name .' szertné hogy csatlakozz az InventorySystem-hez.',
        'thanks' => 'Reméljük hogy oldalunkat hasznosnak találják.',
        'actionText' => 'Csatlakozás!',
        'actionURL' => url('/InventorySystem/public/register'),
    ];  
    
    Notification::route('mail', $request->email)
    ->notify(new InviteMail($invite));
    return ['message', 'Az Email elküldve!'];
    }
}
