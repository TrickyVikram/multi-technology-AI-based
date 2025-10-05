<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'description' => 'Administrator with full access'
            ],
            [
                'name' => 'company',
                'description' => 'Company that can post jobs'
            ],
            [
                'name' => 'client',
                'description' => 'Client that can hire freelancers'
            ],
            [
                'name' => 'freelancer',
                'description' => 'Freelancer that can apply for jobs'
            ],
            [
                'name' => 'team',
                'description' => 'Team member with limited access'
            ],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['name' => $role['name']],
                ['description' => $role['description']]
            );
        }
    }
}
