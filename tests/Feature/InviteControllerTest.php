<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class InviteControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_send_invite()
    {
        $this->seed();
        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/invite',[

            ]);

        $response->assertStatus(422);
        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/invite',[
                'email' => ''
            ]);

        $response->assertStatus(422);
        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/invite',[
                'email' => 'asd'
            ]);

        $response->assertStatus(422);
        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
        ->json('post', '/api/invite',[
            'email' => 'admin@localhost'
        ]);

    $response->assertStatus(200);
        
       
    }
}
