<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id', 'id');
    }
   

    public function logs()
    {
        return $this->hasMany(Log::class, 'user_name', 'name');
    }
}
