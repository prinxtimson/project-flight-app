<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'booking_number',
        'role_applied',
        'mentor',
        'date',
        'time',
        'isEligible'
    ];

    protected $casts = [
        'date' => 'date',
        'isEligible' => 'boolean'
    ];

    public function user ()
    {
        return $this->belongsTo(User::class);
    }
}
