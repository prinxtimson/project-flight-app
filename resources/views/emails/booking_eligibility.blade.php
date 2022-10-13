@component('mail::message')
# You are eligible

Hi {{ $name }},

Your booking with booking number {{$booking_number}} had been received, you can proceed with your booking.


Thanks,<br>
{{ config('app.name') }}
@endcomponent
