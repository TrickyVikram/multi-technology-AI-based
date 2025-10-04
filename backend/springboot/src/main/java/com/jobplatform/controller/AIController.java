package com.jobplatform.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AIController {
    
    @PostMapping("/generate-description")
    public ResponseEntity<?> generateDescription(@RequestBody Map<String, Object> request) {
        String jobTitle = (String) request.get("job_title");
        String companyName = (String) request.get("company_name");
        List<String> keySkills = (List<String>) request.get("key_skills");
        
        if (jobTitle == null || jobTitle.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Job title is required"));
        }
        
        // Mock AI-generated description (replace with actual OpenAI API call in production)
        String skillsText = (keySkills != null && !keySkills.isEmpty()) 
            ? " with expertise in " + String.join(", ", keySkills) 
            : "";
        
        String description = String.format(
            "We are seeking a talented %s%s to join our team%s.\n\n" +
            "Responsibilities:\n" +
            "• Lead and execute key projects\n" +
            "• Collaborate with cross-functional teams\n" +
            "• Drive innovation and continuous improvement\n" +
            "• Mentor junior team members\n\n" +
            "Qualifications:\n" +
            "• 3+ years of relevant experience\n" +
            "• Strong problem-solving skills\n" +
            "• Excellent communication abilities\n" +
            "• Bachelor's degree in relevant field\n\n" +
            "Benefits:\n" +
            "• Competitive salary\n" +
            "• Health insurance\n" +
            "• Flexible working hours\n" +
            "• Professional development opportunities",
            jobTitle,
            skillsText,
            companyName != null ? " at " + companyName : ""
        );
        
        return ResponseEntity.ok(Map.of("description", description));
    }
}
