<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'id' => 1,
                'email' => "admin@localhost",
                'name' => "Teszt Elek",
                'password' => bcrypt('admin'),
                'permission' => 10,
                'city' => "Kőszeg",
                'shop_id' => 1,
                'email_verified_at' => Carbon::parse("2022-12-30"),
                'is_deleted' => 0
            ],
            [
                'id' => 2,
                'email' => "vasarlo@localhost",
                'name' => "Balázs Benedek",
                'password' => bcrypt("password"),
                'permission' => 0,
                'city' => "Kőszeg",
                'email_verified_at' => Carbon::parse("2022-12-30"),
                'is_deleted' => 0
            ],
            [
                'id' => 3,
                'email' => "dolgozo@localhost",
                'name' => "Nagy Tamás",
                'password' => bcrypt("asd123"),
                'permission' => 1,
                'city' => "Kőszeg",
                'shop_id' => 1,
                'email_verified_at' => Carbon::parse("2022-12-30"),
                'is_deleted' => 0
            ],
            [
                'id' => 4,
                'email' => "vasarlo2@localhost",
                'name' => "Kiss János",
                'password' => bcrypt("asd123"),
                'permission' => 0,
                'city' => "Kőszeg",
                'email_verified_at' => Carbon::parse("2022-12-30"),
                'is_deleted' => 1
            ],
            [
                'id' => 5,
                'email' => "vasarlo3@localhost",
                'name' => "Kiss János2",
                'password' => bcrypt("asd123"),
                'permission' => 0,
                'city' => "Kőszeg",

            ],
            [
                'id' => 6,
                'email' => "dolgozo2@localhost",
                'name' => "Nagy Tamás2",
                'password' => bcrypt("asd123"),
                'permission' => 1,
                'city' => "Kőszeg",
                'shop_id' => 2,
                'email_verified_at' => Carbon::parse("2022-12-30")
            ],
        ];
        foreach ($data as $item) {
            $user = User::firstOrNew([
                'id' => $item['id']
            ]);

            foreach ($item as $key => $value) {
                $user->{$key} = $value;
            };

            $user->save();
        }
        //User::factory()->count(30)->create();
    }
}
