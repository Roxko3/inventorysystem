<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\InviteRequest;
use App\Notifications\InviteMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class InviteController extends Controller
{

    public function SendInvite(InviteRequest $request)

    {
        $user = Auth::user();


        $invite = [
            'greeting' => 'Hello ' . $request->email,
            'body' => $user->name . ' szeretné, hogy csatlakozz az InventorySystem-hez.',
            'thanks' => 'Reméljük, hogy oldalunkat hasznosnak találja.',
            'actionText' => 'Csatlakozás!',
            'actionURL' => url('/register'),
        ];

        Notification::route('mail', $request->email)
            ->notify(new InviteMail($invite));
        return ['message' => 'E-mail sikeresen elküldve!'];
    }
}
