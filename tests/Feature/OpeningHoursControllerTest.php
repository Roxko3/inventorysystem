<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OpeningHoursControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_getOpeningHours()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/shops/1/getOpeningHours');

        $response->assertStatus(200);
    }

    public function test_updateOpeningHours()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/1/updateOpeningHours');

        $response->assertStatus(422);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/2/updateOpeningHours', [
                "opening_hours" => [
                    "Monday" => [
                        "open_time" => -1,
                        "close_time" => "17:00"
                    ]
                ]
            ]);

        $response->assertStatus(403);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/1/updateOpeningHours', [
                "opening_hours" => [
                    "Monday" => [
                        "open_time" => "12:00",
                        "close_time" => "17:00"
                    ],
                    "tuesday" => [
                        "open_time" => "12:00",
                        "close_time" => "Alma"
                    ],
                    "wednesday" => [
                        "open_time" => "12:00",
                        "close_time" => "17:00"
                    ],
                    "thursday" => [
                        "open_time" => "12:00",
                        "close_time" => "17:00"
                    ],
                    "friday" => [
                        "open_time" => "12:00",
                        "close_time" => "17:00"
                    ],
                    "saturday" => [
                        "open_time" => "12:00",
                        "close_time" => "17:00"
                    ],
                    "sunday" => [
                        "open_time" => 0,
                        "close_time" => "17:00"
                    ]
                ]
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/1/updateOpeningHours', [
                "opening_hours" => [
                    "Monday" => [
                        "open_time" => "12:00",
                        "close_time" => "17:00"
                    ],
                    "Sunday" => [
                        "open_time" => "17:00",
                        "close_time" => "12:00"
                    ]
                ]
            ]);

        $response->assertStatus(422);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/1/updateOpeningHours', [
                "opening_hours" => [
                    "Valami" => [
                        "open_time" => "12:00",
                        "close_time" => "17:00"
                    ]
                ]
            ]);

        $response->assertStatus(422);
    }
}
