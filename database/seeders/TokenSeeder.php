<?php

namespace Database\Seeders;

use App\Models\Token;
use Illuminate\Database\Seeder;

class TokenSeeder extends Seeder
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
                'email' => 'dolgozo3@localhost',
                'tokenPassword' => 'pVaUA5fyKyuBYxjgaiEDyd5TFHyBNgsWBcRtdudzFJtjAw2SOkaatZbTrzLKRL9u',
                'created_atPassword' => null,
                'tokenEmail' => 'FVxOkXg7t9rDRx1ID8VdVGBtrlxZLps13poQBr690cMb16n6MF2CrJglUISuzERC',
                "created_atEmail" => null,
            ]
        ];


        foreach ($data as $item) {
            $token = Token::firstOrNew([
                'id' => $item['id']
            ]);

            foreach ($item as $key => $value) {
                $token->{$key} = $value;
            };

            $token->save();
        }
    }
}
