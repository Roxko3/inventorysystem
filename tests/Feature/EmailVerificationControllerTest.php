<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EmailVerificationControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_send_Email_verify()
    {
        $this->seed();
        $response = $this->post('/api/email/verification-notification', [
            'email' => 'vasarlo3'
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/email/verification-notification', [
            'email' => 'asd@asd'
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/email/verification-notification', [
            'email' => 'vasarlo3@localhost'
        ]);
        $response->assertStatus(200);

        $response = $this->post('/api/email/verification-notification', [
            'email' => 'admin@localhost'
        ]);
        $response->assertStatus(400);
    }
    public function test_Email_verify()
    {
        $this->seed();
        $response = $this->post('/api/verify-email', []);
        $response->assertStatus(422);

        $response = $this->post('/api/verify-email', [
            'tokenEmail' => ''
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/verify-email', [
            'tokenEmail' => 'asda'
        ]);
        $response->assertStatus(422);

        $response = $this->post('/api/verify-email', [
            'tokenEmail' => 'FVxOkXg7t9rDRx1ID8VdVGBtrlxZLps13poQBr690cMb16n6MF2CrJglUISuzERC'
        ]);
        $response->assertStatus(200);
    }
}
