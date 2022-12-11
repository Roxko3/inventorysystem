<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use /*HasApiTokens,*/ HasFactory, Notifiable;

    public $timestamps = false;

    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id', 'id');
    }


    public function logs()
    {
        return $this->hasMany(Log::class, 'user_id', 'id');
    }
}
