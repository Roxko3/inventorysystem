<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function storages()
    {
        return $this->hasMany(Storage::class, 'product_id', 'id');
    }
}
