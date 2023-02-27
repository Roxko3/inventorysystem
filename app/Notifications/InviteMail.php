<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InviteMail extends Notification
{
    use Queueable;
    protected $Invite;
    protected $email;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($Invite )
    {
        $this->Invite = $Invite;
       
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
        ->greeting($this->Invite['greeting'])
        ->line($this->Invite['body'])
        ->action($this->Invite['actionText'], $this->Invite['actionURL'])
        ->line($this->Invite['thanks']);
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
