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
        Schema::create('storage', function (Blueprint $table) {
            $table->foreignId('shop_id')->constrained("shops")->key();
            $table->foreignId('product_id')->constrained("products")->key();
            $table->Integer("amount");
            $table->Integer("prize");
            $table->datetime("expiration")->nullable();
            $table->boolean("is_deleted")->default(false);
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
