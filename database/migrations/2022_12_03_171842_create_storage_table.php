<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStorageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('storages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained("shops");
            $table->foreignId('product_id')->constrained("products");
            $table->Integer("amount");
            $table->Integer("price");
            $table->date("expiration")->nullable();
            $table->boolean("is_deleted")->default(false);
            $table->unique(['shop_id', 'product_id', 'expiration']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('storage');
    }
}
