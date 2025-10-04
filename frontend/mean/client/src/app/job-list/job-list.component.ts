import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-list',
  template: `
    <div>
      <h1>Job Listings</h1>
      <div *ngIf="loading">Loading...</div>
      <div *ngIf="error" class="error">{{ error }}</div>
      <div *ngIf="!loading && jobs.length === 0">
        <p>No jobs available. Create your first job!</p>
      </div>
      <div *ngFor="let job of jobs" class="card">
        <h3>{{ job.title }}</h3>
        <p><strong>Company:</strong> {{ job.company }}</p>
        <p><strong>Location:</strong> {{ job.location }}</p>
        <p *ngIf="job.salary"><strong>Salary:</strong> {{ job.salary }}</p>
        <p>{{ job.description }}</p>
        <small>Posted: {{ job.createdAt | date }}</small>
      </div>
    </div>
  `
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  loading = true;
  error = '';

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobService.getJobs().subscribe({
      next: (response) => {
        this.jobs = response.jobs;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch jobs';
        this.loading = false;
      }
    });
  }
}
