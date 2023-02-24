<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RatingControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_rate()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/rate/3', [
                'rating' => 5
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/rate/2', [
                'rating' => 0
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/rate/2', [
                'rating' => 9
            ]);

        $response->assertStatus(422);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/rate/3', [
                'rating' => 0
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/rate/3', [
                'rating' => 0
            ]);

        $response->assertStatus(404);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/rate/1', [
                'rating' => 1
            ]);

        $response->assertStatus(403);
    }
}
