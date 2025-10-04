<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AIController extends Controller
{
    public function generateDescription(Request $request)
    {
        $request->validate([
            'job_title' => 'required|string',
            'company_name' => 'nullable|string',
            'key_skills' => 'nullable|array',
        ]);

        $jobTitle = $request->job_title;
        $companyName = $request->company_name;
        $keySkills = $request->key_skills ?? [];

        // Mock AI-generated description (replace with actual OpenAI API call in production)
        // To use real OpenAI API, install openai-php/client and configure API key
        /*
        $client = \OpenAI::client(env('OPENAI_API_KEY'));
        $prompt = "Generate a professional job description for {$jobTitle}" .
                  ($companyName ? " at {$companyName}" : "") . ". ";
        if (!empty($keySkills)) {
            $prompt .= "Required skills: " . implode(', ', $keySkills) . ". ";
        }
        $prompt .= "Include responsibilities, qualifications, and benefits.";
        
        $result = $client->chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'user', 'content' => $prompt],
            ],
        ]);
        $description = $result->choices[0]->message->content;
        */

        // Mock response
        $skillsText = !empty($keySkills) ? " with expertise in " . implode(', ', $keySkills) : "";
        $description = "We are seeking a talented {$jobTitle}{$skillsText} to join our team" .
                       ($companyName ? " at {$companyName}" : "") . ".

Responsibilities:
• Lead and execute key projects
• Collaborate with cross-functional teams
• Drive innovation and continuous improvement
• Mentor junior team members

Qualifications:
• 3+ years of relevant experience
• Strong problem-solving skills
• Excellent communication abilities
• Bachelor's degree in relevant field

Benefits:
• Competitive salary
• Health insurance
• Flexible working hours
• Professional development opportunities";

        return response()->json(['description' => $description]);
    }
}
