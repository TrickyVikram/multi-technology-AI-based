<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $table = 'job_listings';

    protected $fillable = [
        'title',
        'description',
        'company',
        'location',
        'salary',
        'job_type',
        'requirements',
        'posted_date',
        'application_deadline'
    ];

    protected $casts = [
        'posted_date' => 'datetime',
        'application_deadline' => 'datetime',
        'requirements' => 'array'
    ];
}
