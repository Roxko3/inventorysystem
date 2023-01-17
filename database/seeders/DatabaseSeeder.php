<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            ShopTypesSeeder::class,
            ShopsSeeder::class,
            UsersSeeder::class,
            LogsSeeder::class,
            ProductsSeeder::class,
            StorageSeeder::class,
            RatingSeeder::class,
        ]);
    }
}
