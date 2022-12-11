<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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
                'password' => Hash::make('admin'),
                'permission' => 10,
                'postal_code' => 9730,
                'shop_id' => 1,
                'email_verified_at' => Carbon::parse("2022-12-30")
            ],
            [
                'id' => 2,
                'email' => "vasarlo@localhost",
                'name' => "Balázs Benedek",
                'password' => Hash::make("password"),
                'permission' => 0,
                'postal_code' => 9730,
                'email_verified_at' => Carbon::parse("2022-12-30")
            ],
            [
                'id' => 3,
                'email' => "dolgozo@localhost",
                'name' => "Nagy Tamás",
                'password' => Hash::make("asd123"),
                'permission' => 1,
                'postal_code' => 9730,
                'shop_id' => 1
            ],
            [
                'id' => 4,
                'email' => "vasarlo2@localhost",
                'name' => "Kiss János",
                'password' => Hash::make("asd123"),
                'permission' => 0,
                'postal_code' => 9730
            ]
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
    }
}
