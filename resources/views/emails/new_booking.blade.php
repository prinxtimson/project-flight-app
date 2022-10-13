@component('mail::message')
New Booking

@component('mail::panel')
# Name: {{ $name }}
# Booking ID: {{ $booking_id }}
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
