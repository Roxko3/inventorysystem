<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_index()
    {
        $this->seed();

        $response = $this->json('get', '/api/users/');

        $response->assertStatus(200);
    }


    public function test_create()
    {
        $response = $this->json('post', '/api/users/create', [
            'email' => "createteszt@localhost",
            'name' => "Aladár András",
            'password' => 'password',
            'permission' => 10,
            'city' => "Szombathely",
            'shop_id' => 1,
        ]);

        $response->assertStatus(200);

        $response = $this->json('post', '/api/users/create');

        $response->assertStatus(422);
    }

    public function test_update()
    {
        $this->seed();

        $response = $this->json('put', '/api/users/1', [
            'email' => "tesztelek@localhost",
            'name' => "Aladár András",
            'password' => 'password',
            'permission' => 10,
            'city' => "Szombathely",
            'shop_id' => 1,
        ]);

        $response->assertStatus(200);
    }

    public function test_delete()
    {
        $this->artisan('migrate:fresh');

        $this->json('post', '/api/users/create', [
            'email' => "createteszt@localhost",
            'name' => "Aladár András",
            'password' => 'password',
        ]);

        $response = $this->json('delete', '/api/users/1');

        $response->assertStatus(200);
    }
}
