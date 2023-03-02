<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ForgotPasswordControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_send_password_reset_mail()
    {
        $this->seed();
        $response = $this->post('/api/forget-password',[]);
        $response->assertStatus(422);

        $response = $this->post('/api/forget-password',[
            'email' => ''
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/forget-password',[
            'email' => 'asd'
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/forget-password',[
            'email' => 'asd@aasdas'
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/forget-password',[
            'email' => 'vasarlo3@localhost'
        ]);
        $response->assertStatus(200);
        $response = $this->post('/api/forget-password',[
            'email' => 'dolgozo3@localhost'
        ]);
        $response->assertStatus(200);
    }
    public function test_use_password_token()
    {
        $this->seed();
        $response = $this->post('/api/reset-password',[]);
        $response->assertStatus(422);

        $response = $this->post('/api/reset-password',[
            'token' => '',
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/reset-password',[
            'token' => '',
            'password' => '',
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/reset-password',[
            'token' => '',
            'password' => '',
            'password-repeat' => '',
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/reset-password',[
            'token' => 'asd',
            'password' => 'asd',
            'password-repeat' => 'asd',
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/reset-password',[
            'token' => 'pVaUA5fyKyuBYxjgaiEDyd5TFHyBNgsWBcRtdudzFJtjAw2SOkaatZbTrzLKRL9u',
            'password' => '',
            'password-repeat' => '',
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/reset-password',[
            'token' => 'pVaUA5fyKyuBYxjgaiEDyd5TFHyBNgsWBcRtdudzFJtjAw2SOkaatZbTrzLKRL9u',
            'password' => 'asd',
            'password-repeat' => '',
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/reset-password',[
            'token' => 'pVaUA5fyKyuBYxjgaiEDyd5TFHyBNgsWBcRtdudzFJtjAw2SOkaatZbTrzLKRL9u',
            'password' => 'asd',
            'password-repeat' => 'asd',
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/reset-password',[
            'token' => 'pVaUA5fyKyuBYxjgaiEDyd5TFHyBNgsWBcRtdudzFJtjAw2SOkaatZbTrzLKRL9u',
            'password' => 'Jójelszó123',
            'password-repeat' => '',
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/reset-password',[
            'token' => 'pVaUA5fyKyuBYxjgaiEDyd5TFHyBNgsWBcRtdudzFJtjAw2SOkaatZbTrzLKRL9u',
            'password' => 'Jójelszó123',
            'password-repeat' => 'Jójelszó123',
        ]);
        $response->assertStatus(200);

    }
}
