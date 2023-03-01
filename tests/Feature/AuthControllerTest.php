<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_login_user1()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'password' => 'admin'
        ]);

        $response->assertStatus(422);

        $response = $this->post('api/login', [
            'email' => 'TesztElekasd@asd.asd',
            'password' => 'admin'
        ]);

        $response->assertStatus(422);

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $response->assertStatus(200);
    }

    public function test_login_user2()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'vasarlo3@localhost',
            'password' => 'asd123'
        ]);

        $response->assertStatus(403);
    }

    public function test_login_user3()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'vasarlo2@localhost',
            'password' => 'asd123'
        ]);

        $response->assertStatus(409);
    }

    public function test_register()
    {
        $this->seed();

        $response = $this->post('api/register', [
            'email' => 'Teszt',
            'name' => 'admin',
            'password' => 'TesztElek1',
            'password_repeat' => 'Teszt'
        ]);

        $response->assertStatus(422);

        $response = $this->post('api/register', [
            'email' => 'TesztElek@localhost',
            'name' => 'admin',
            'password' => 'TesztElek1',
            'password_repeat' => 'TesztElek1'
        ]);

        $response->assertStatus(200);
    }

    public function test_logout()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)->json('post', 'api/Logout');

        $response->assertStatus(204);
    }
}
