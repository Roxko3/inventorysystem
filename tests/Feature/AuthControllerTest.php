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

    public function test_login()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $response->assertStatus(200);
    }

    public function test_register()
    {
        $this->seed();

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

        $response->assertStatus(200);
    }

}
