<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\JobCategory;

class JobCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Software Development',
                'description' => 'Jobs related to software development, programming, and coding including full-stack, frontend, backend, and mobile development roles.'
            ],
            [
                'name' => 'Data Science & Analytics',
                'description' => 'Positions focused on data analysis, machine learning, artificial intelligence, and business intelligence.'
            ],
            [
                'name' => 'DevOps & Infrastructure',
                'description' => 'Roles involving system administration, cloud infrastructure, deployment automation, and site reliability engineering.'
            ],
            [
                'name' => 'UI/UX Design',
                'description' => 'Creative positions focused on user interface design, user experience research, and product design.'
            ],
            [
                'name' => 'Cybersecurity',
                'description' => 'Security-focused roles including penetration testing, security analysis, and information security management.'
            ],
            [
                'name' => 'Product Management',
                'description' => 'Strategic roles involving product planning, roadmap development, and cross-functional team coordination.'
            ],
            [
                'name' => 'Quality Assurance',
                'description' => 'Testing and quality assurance positions including manual testing, automation testing, and QA engineering.'
            ],
            [
                'name' => 'Project Management',
                'description' => 'Leadership roles focused on project coordination, agile methodologies, and team management.'
            ]
        ];

        foreach ($categories as $category) {
            JobCategory::create($category);
        }
    }
}
