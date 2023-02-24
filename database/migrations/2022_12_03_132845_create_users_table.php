<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string("email")->unique();
            $table->string("name");
            $table->string("password");
            $table->Integer("permission")->nullable()->default(0);
            $table->string("city")->nullable();
            $table->foreignId("shop_id")->nullable()->constrained("shops");
            $table->string("image_path")->nullable();
            $table->datetime("email_verified_at")->nullable();
            $table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
