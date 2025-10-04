<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id',
        'user_id',
        'applicant_name',
        'applicant_email',
        'phone',
        'resume_url',
        'cover_letter',
        'status',
        'admin_notes',
        'applied_at'
    ];

    protected $casts = [
        'applied_at' => 'datetime'
    ];

    /**
     * Get the job that this application belongs to.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    /**
     * Get the user that submitted this application.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
