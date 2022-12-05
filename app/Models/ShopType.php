<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopType extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function shops()
    {
        return $this->hasMany(Shop::class, 'shop_types_id', 'id');
    }
}
