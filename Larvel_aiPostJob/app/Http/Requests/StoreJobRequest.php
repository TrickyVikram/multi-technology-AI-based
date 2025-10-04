<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Allow all users to create jobs for demo purposes
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'min:5',
                'max:255',
                'regex:/^[a-zA-Z0-9\s\-\.\/\(\)]+$/' // Allow alphanumeric, spaces, hyphens, dots, slashes, parentheses
            ],
            'description' => [
                'required',
                'string',
                'min:50',
                'max:5000'
            ],
            'company' => [
                'required',
                'string',
                'min:2',
                'max:255',
                'regex:/^[a-zA-Z0-9\s\-\.&]+$/' // Allow company names with &, -, . characters
            ],
            'location' => [
                'required',
                'string',
                'min:2',
                'max:255'
            ],
            'salary' => [
                'nullable',
                'string',
                'max:100',
                'regex:/^[\$£€¥₹]?[\d,]+(\s?-\s?[\$£€¥₹]?[\d,]+)?(\s?(per\s)?(hour|day|week|month|year|annually))?$/i'
            ],
            'job_type' => [
                'required',
                'in:full-time,part-time,contract,freelance,internship'
            ],
            'category_id' => [
                'nullable',
                'integer',
                'exists:job_categories,id'
            ],
            'requirements' => [
                'nullable',
                'array',
                'min:1',
                'max:20'
            ],
            'requirements.*' => [
                'string',
                'min:2',
                'max:255'
            ],
            'application_deadline' => [
                'nullable',
                'date',
                'after:today',
                'before:' . now()->addYear()->toDateString() // Not more than 1 year in future
            ]
        ];
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Job title is required and cannot be empty.',
            'title.min' => 'Job title must be at least 5 characters long.',
            'title.max' => 'Job title cannot exceed 255 characters.',
            'title.regex' => 'Job title contains invalid characters. Only letters, numbers, spaces, hyphens, dots, slashes, and parentheses are allowed.',

            'description.required' => 'Job description is required and cannot be empty.',
            'description.min' => 'Job description must be at least 50 characters long to provide adequate detail.',
            'description.max' => 'Job description cannot exceed 5000 characters.',

            'company.required' => 'Company name is required and cannot be empty.',
            'company.min' => 'Company name must be at least 2 characters long.',
            'company.max' => 'Company name cannot exceed 255 characters.',
            'company.regex' => 'Company name contains invalid characters. Only letters, numbers, spaces, hyphens, dots, and ampersands are allowed.',

            'location.required' => 'Job location is required and cannot be empty.',
            'location.min' => 'Location must be at least 2 characters long.',
            'location.max' => 'Location cannot exceed 255 characters.',

            'salary.regex' => 'Salary format is invalid. Please use formats like "$50,000", "$40,000 - $60,000", "$25/hour", etc.',
            'salary.max' => 'Salary field cannot exceed 100 characters.',

            'job_type.required' => 'Job type is required. Please select one of: full-time, part-time, contract, freelance, or internship.',
            'job_type.in' => 'Invalid job type selected. Choose from: full-time, part-time, contract, freelance, or internship.',

            'category_id.exists' => 'Selected job category does not exist. Please choose a valid category.',
            'category_id.integer' => 'Category ID must be a valid number.',

            'requirements.array' => 'Requirements must be provided as a list.',
            'requirements.min' => 'At least one requirement must be specified.',
            'requirements.max' => 'Cannot specify more than 20 requirements.',
            'requirements.*.string' => 'Each requirement must be a text string.',
            'requirements.*.min' => 'Each requirement must be at least 2 characters long.',
            'requirements.*.max' => 'Each requirement cannot exceed 255 characters.',

            'application_deadline.date' => 'Application deadline must be a valid date.',
            'application_deadline.after' => 'Application deadline must be in the future.',
            'application_deadline.before' => 'Application deadline cannot be more than one year from today.'
        ];
    }

    /**
     * Get custom attribute names for error messages.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'title' => 'job title',
            'description' => 'job description',
            'company' => 'company name',
            'location' => 'job location',
            'salary' => 'salary range',
            'job_type' => 'job type',
            'category_id' => 'job category',
            'requirements' => 'job requirements',
            'application_deadline' => 'application deadline'
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Clean and prepare data before validation
        if ($this->has('title')) {
            $this->merge([
                'title' => trim($this->title)
            ]);
        }

        if ($this->has('description')) {
            $this->merge([
                'description' => trim($this->description)
            ]);
        }

        if ($this->has('company')) {
            $this->merge([
                'company' => trim($this->company)
            ]);
        }

        if ($this->has('location')) {
            $this->merge([
                'location' => trim($this->location)
            ]);
        }

        // Clean requirements array
        if ($this->has('requirements') && is_array($this->requirements)) {
            $cleanRequirements = array_filter(
                array_map('trim', $this->requirements),
                function ($req) {
                    return !empty($req);
                }
            );
            $this->merge([
                'requirements' => array_values($cleanRequirements)
            ]);
        }
    }
}
