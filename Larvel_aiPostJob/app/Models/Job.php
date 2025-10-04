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
        'application_deadline',
        'category_id'
    ];

    protected $casts = [
        'posted_date' => 'datetime',
        'application_deadline' => 'datetime',
        'requirements' => 'array'
    ];

    /**
     * Get the category that owns the job.
     */
    public function category()
    {
        return $this->belongsTo(JobCategory::class, 'category_id');
    }

    /**
     * Get the applications for this job.
     */
    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
