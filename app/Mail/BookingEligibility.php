<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookingEligibility extends Mailable
{
    use Queueable, SerializesModels;

    private $user;
    private $booking;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $booking)
    {
        $this->user = $user;
        $this->booking = $booking; 
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.booking_eligibility')->with([
            'name' => $this->user->name,
            'booking_number' => $this->booking->booking_number
        ]);
    }
}
