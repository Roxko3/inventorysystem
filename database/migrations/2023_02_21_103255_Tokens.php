<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Tokens extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Tokens', function (Blueprint $table) {
            $table->id();
            $table->string('email')->index();
            $table->string('tokenPassword')->nullable();
            $table->timestamp('created_atPassword')->nullable();
            $table->string('tokenEmail')->nullable();
            $table->timestamp('created_atEmail')->nullable();

            $table->foreign('email') // a column on posts table
                ->references('email') //name of the column on users (referenced) table
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Tokens');
    }
}
