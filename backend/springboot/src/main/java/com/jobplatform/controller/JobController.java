package com.jobplatform.controller;

import com.jobplatform.model.Job;
import com.jobplatform.model.User;
import com.jobplatform.repository.JobRepository;
import com.jobplatform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class JobController {
    
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<Map<String, List<Job>>> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        return ResponseEntity.ok(Map.of("jobs", jobs));
    }
    
    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody Job job, Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        job.setUser(user);
        Job savedJob = jobRepository.save(job);
        
        return ResponseEntity.ok(Map.of("job", savedJob));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getJob(@PathVariable Long id) {
        Job job = jobRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job not found"));
        return ResponseEntity.ok(Map.of("job", job));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable Long id, @RequestBody Job jobDetails) {
        Job job = jobRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Job not found"));
        
        if (jobDetails.getTitle() != null) job.setTitle(jobDetails.getTitle());
        if (jobDetails.getDescription() != null) job.setDescription(jobDetails.getDescription());
        if (jobDetails.getCompany() != null) job.setCompany(jobDetails.getCompany());
        if (jobDetails.getLocation() != null) job.setLocation(jobDetails.getLocation());
        if (jobDetails.getSalary() != null) job.setSalary(jobDetails.getSalary());
        
        Job updatedJob = jobRepository.save(job);
        return ResponseEntity.ok(Map.of("job", updatedJob));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {
        jobRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Job deleted successfully"));
    }
}
