<?php

namespace Database\Seeders;

use App\Models\User;
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
                'first_name' => "Teszt",
                'last_name' => "Elek",
                'password' => "admin",
                'permission' => 10,
                'postal_code' => 9730,
                'shop_id' => 1
            ],
            [
                'id' => 2,
                'email' => "vasarlo@localhost",
                'first_name' => "Balázs",
                'last_name' => "Benedek",
                'password' => "asd123",
                'permission' => 0,
                'postal_code' => 9730
            ],
            [
                'id' => 3,
                'email' => "dolgozo@localhost",
                'first_name' => "Tamás",
                'last_name' => "Nagy",
                'password' => "asd123",
                'permission' => 1,
                'postal_code' => 9730,
                'shop_id' => 1
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
