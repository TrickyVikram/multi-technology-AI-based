<?php

namespace App\Http\Requests;

class CreateJobRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'company' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'salary_range' => 'required|string|max:100',
            'job_type' => 'required|string|in:full-time,part-time,contract,freelance',
            'category_id' => 'required|exists:job_categories,id',
            'skills_required' => 'required|string',
            'experience_level' => 'required|string|in:entry,mid-level,senior,lead',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'title.required' => 'Please enter a job title',
            'description.required' => 'Please provide a job description',
            'company.required' => 'Please enter the company name',
            'location.required' => 'Please specify the job location',
            'salary_range.required' => 'Please specify the salary range',
            'job_type.required' => 'Please select the job type',
            'job_type.in' => 'Please select a valid job type',
            'category_id.required' => 'Please select a job category',
            'category_id.exists' => 'The selected job category is invalid',
            'skills_required.required' => 'Please list the required skills',
            'experience_level.required' => 'Please select the experience level',
            'experience_level.in' => 'Please select a valid experience level',
        ];
    }
}