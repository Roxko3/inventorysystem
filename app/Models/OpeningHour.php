<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OpeningHour extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function shop()
    {
        return $this->belongsTo(Shop::class, 'shop_id', 'id');
    }
}
