<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ProfileControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_myProfile()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/myProfile');

        $response->assertStatus(200);
    }

    public function test_nameEmail()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/nameEmail', [
                'name' => 'admin2',
                'email' => 'admin2@localhost'
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/nameEmail', [
                'email' => 'admin2@localhost'
            ]);

        $response->assertStatus(422);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/nameEmail', [
                'name' => 'admin',
                'email' => 'vasarlo@localhost'
            ]);

        $response->assertStatus(409);
    }

    public function test_passwordChange()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/passwordChange');

        $response->assertStatus(422);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/passwordChange', [
                'old-password' => "alma",
                'new-password' => "TesztElek1",
                'new-password-repeat' => "TesztElek1"
            ]);

        $response->assertStatus(422);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/passwordChange', [
                'old-password' => "admin",
                'new-password' => "TesztElek1",
                'new-password-repeat' => "TesztElek1"
            ]);

        $response->assertStatus(200);
    }

    public function test_postalCodeChange()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/postalCodeChange', [
                'postal_code' => 2000,
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/postalCodeChange', [
                'postal_code' => "alma"
            ]);

        $response->assertStatus(422);
    }

    public function test_uploadImage()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $image = UploadedFile::fake()->create('image.jpg', 100);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/uploadImage', [
                'image' => $image,
            ]);

        $response->assertStatus(200);

        $image = UploadedFile::fake()->create('image.jpg', 100);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/uploadImage', [
                'image' => $image,
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/myProfile/deleteImage');

        $response->assertStatus(200);
    }

    public function test_deleteImage()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $image = UploadedFile::fake()->create('image.jpg', 100);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/uploadImage', [
                'image' => $image,
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/myProfile/deleteImage');

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/myProfile/deleteImage');

        $response->assertStatus(404);;
    }
}
