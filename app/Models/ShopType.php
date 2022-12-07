<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopType extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function shop()
    {
        return $this->hasMany(Shop::class, 'shop_type_id', 'id');
    }
}
