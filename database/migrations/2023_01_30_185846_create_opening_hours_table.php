<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpeningHoursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Opening_Hours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained("shops");
            $table->string("day");
            $table->boolean("is_open")->default(false);
            $table->time("open")->nullable();
            $table->time("close")->nullable();
            $table->unique(['shop_id', 'day']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Opening_Hours');
    }
}
