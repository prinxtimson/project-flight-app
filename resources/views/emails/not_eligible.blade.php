@component('mail::message')
# You are not eligible

Hi {{ $name }},

Your booking with booking number {{$booking_number}} had been received, you can not proceed with this booking.


Thanks,<br>
{{ config('app.name') }}
@endcomponent
