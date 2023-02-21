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

    public function ratings()
    {
        return $this->hasMany(Rating::class, 'shop_id', 'id');
    }

    public function openingHours()
    {
        return $this->hasMany(OpeningHour::class, 'shop_id', 'id');
    }

    public function logs()
    {
        return $this->hasMany(Log::class, 'shop_id', 'id');
    }

    public function storages()
    {
        return $this->hasMany(Storage::class, 'shop_id', 'id');
    }

    public function shopType()
    {
        return $this->belongsTo(ShopType::class, 'shop_type_id', 'id');
    }
}
