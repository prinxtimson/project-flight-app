<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $bookings = Booking::withTrashed()->where('user_id', $user->id)->orderBy('id', 'DESC')->get();

        return $bookings;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = auth()->user();

        $fields = $request->validate([
            'role_applied' => 'required|string',
            'mentor' => 'string',
            'date' => 'required|date|date_format:m/d/Y',
            'time' => 'required|string',

        ]);

        $fields['booking_number'] = 'BKG' . time();

        $booking = $user->bookings()->create($fields);

        return $booking;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Booking::withTrashed()->find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            'date' => 'required|date|date_format:m/d/Y',
            'time' => 'string',
        ]);

        $booking = Booking::withTrashed()->find($id);

        $booking->update($fields);
        $booking->restore();
        
        return $booking;
    }

    public function cancel ($id)
    {
        $booking = Booking::withTrashed()->find($id);

        if(isset($booking) && isset($booking->delete_at)){
            return 'Booking had been canceled successfuly';
        }        
        $booking->delete();

        return 'Booking had been canceled successfuly';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $booking = Booking::withTrashed()->find($id);

        if(is_null($booking)){
            return 'Booking not found';
        }

        $booking->forceDelete();

        return 'Booking had been deleted successfuly';
    }
}
