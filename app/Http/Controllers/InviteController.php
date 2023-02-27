<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\InviteRequest;
use Notification;
use App\Notifications\InviteMail;

class InviteController extends Controller
{
   
    public function SendInvite(InviteRequest $request)
    { $invite = [
        'greeting' => 'Hello '.$request->email.' email cím tulajdonos,',
        'body' => 'Ugynézki valaki szertné hogy csatlakoz az InventorySystem-hez.',
        'thanks' => 'Köszönjök hogy lehetőséget adnak.',
        'actionText' => 'Csatlakozás!',
        'actionURL' => url('/InventorySystem/public/register'),
    ];  
    
    Notification::route('mail', $request->email)
    ->notify(new InviteMail($invite));
    }
}
