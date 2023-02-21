<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordResetEmail extends Notification
{
    use Queueable;
    protected $resetpassword;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($resetpassword)
    {
        $this->resetpassword = $resetpassword;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
        ->greeting($this->resetpassword['greeting'])
        ->line($this->resetpassword['body'])
        ->action($this->resetpassword['actionText'], $this->resetpassword['actionURL'])
        ->line($this->resetpassword['thanks']);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
