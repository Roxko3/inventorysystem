<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function users()
    {
        return $this->hasMany(User::class, 'shop_id', 'id');
    }

    public function shopType()
    {
        return $this->belongsTo(ShopType::class, 'shop_types_id', 'id');
    }
}
