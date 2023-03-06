<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->foreignId("shop_type_id")->constrained("shop_types")->onDelete("CASCADE");
            $table->string("address");
            $table->string("owner");
            $table->string("city");
            $table->string("image_path")->nullable();
            $table->double("rating")->default(0);
            $table->boolean("is_deleted")->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shops');
    }
}
