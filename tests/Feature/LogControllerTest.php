<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LogControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_index()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/logs/1');

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/logs/2');

        $response->assertStatus(403);
    }

    public function test_searchLogs()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/logs/searchLogs/2');

        $response->assertStatus(403);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/logs/searchLogs/1', [
                'column' => "description",
                'order' => "asc",
                'searchString' => "tej"
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/logs/searchLogs/1', [
                'column' => "name",
                'order' => "asc",
                'searchString' => "tej"
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/logs/searchLogs/1', []);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/logs/searchLogs/1', [
                'column' => "teszt",
                'order' => "teszt",
                'searchString' => "teszt"
            ]);

        $response->assertStatus(422);
    }
}
