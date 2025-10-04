<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Job;
use Carbon\Carbon;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobs = [
            [
                'title' => 'Senior Laravel Developer',
                'description' => 'We are looking for an experienced Laravel developer to join our team. You will be responsible for developing and maintaining web applications using Laravel framework.',
                'company' => 'TechCorp Solutions',
                'location' => 'Remote',
                'salary' => '$80,000 - $120,000',
                'job_type' => 'full-time',
                'requirements' => [
                    '5+ years of PHP experience',
                    'Expert knowledge of Laravel framework',
                    'Experience with MySQL and PostgreSQL',
                    'Knowledge of Vue.js or React',
                    'Git version control'
                ],
                'posted_date' => Carbon::now(),
                'application_deadline' => Carbon::now()->addDays(30),
            ],
            [
                'title' => 'Frontend React Developer',
                'description' => 'Join our frontend team to build amazing user interfaces using React.js. We are building the next generation of web applications.',
                'company' => 'WebTech Innovations',
                'location' => 'New York, NY',
                'salary' => '$70,000 - $100,000',
                'job_type' => 'full-time',
                'requirements' => [
                    '3+ years of React.js experience',
                    'Proficiency in JavaScript ES6+',
                    'Experience with Redux or Context API',
                    'Knowledge of HTML5 and CSS3',
                    'Familiarity with REST APIs'
                ],
                'posted_date' => Carbon::now()->subDays(5),
                'application_deadline' => Carbon::now()->addDays(25),
            ],
            [
                'title' => 'Python Data Scientist',
                'description' => 'We are seeking a data scientist to analyze large datasets and build machine learning models using Python.',
                'company' => 'DataTech Analytics',
                'location' => 'San Francisco, CA',
                'salary' => '$90,000 - $140,000',
                'job_type' => 'full-time',
                'requirements' => [
                    'PhD or Masters in Data Science/Statistics',
                    'Expert in Python (pandas, numpy, scikit-learn)',
                    'Experience with TensorFlow or PyTorch',
                    'SQL database knowledge',
                    'Data visualization tools (Tableau, PowerBI)'
                ],
                'posted_date' => Carbon::now()->subDays(10),
                'application_deadline' => Carbon::now()->addDays(20),
            ],
            [
                'title' => 'Mobile App Developer (Flutter)',
                'description' => 'Develop cross-platform mobile applications using Flutter framework for iOS and Android platforms.',
                'company' => 'MobileFirst Solutions',
                'location' => 'Austin, TX',
                'salary' => '$65,000 - $95,000',
                'job_type' => 'contract',
                'requirements' => [
                    '2+ years of Flutter development',
                    'Dart programming language',
                    'iOS and Android deployment experience',
                    'REST API integration',
                    'Firebase integration'
                ],
                'posted_date' => Carbon::now()->subDays(3),
                'application_deadline' => Carbon::now()->addDays(35),
            ],
            [
                'title' => 'DevOps Engineer',
                'description' => 'Manage and optimize our cloud infrastructure, CI/CD pipelines, and deployment processes.',
                'company' => 'CloudScale Technologies',
                'location' => 'Remote',
                'salary' => '$85,000 - $125,000',
                'job_type' => 'full-time',
                'requirements' => [
                    'AWS/Azure/GCP experience',
                    'Docker and Kubernetes',
                    'CI/CD pipelines (Jenkins, GitLab CI)',
                    'Infrastructure as Code (Terraform)',
                    'Linux system administration'
                ],
                'posted_date' => Carbon::now()->subDays(7),
                'application_deadline' => Carbon::now()->addDays(28),
            ]
        ];

        foreach ($jobs as $job) {
            Job::create($job);
        }
    }
}
