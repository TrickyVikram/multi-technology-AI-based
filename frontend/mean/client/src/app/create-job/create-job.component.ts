import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../job.service';

@Component({
  selector: 'app-create-job',
  template: `
    <div class="card" style="max-width: 600px; margin: 50px auto;">
      <h2>Create Job Posting</h2>
      <div *ngIf="error" class="error">{{ error }}</div>
      <div *ngIf="success" class="success">{{ success }}</div>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Job Title</label>
          <input type="text" [(ngModel)]="formData.title" name="title" required>
        </div>
        <div class="form-group">
          <label>Company</label>
          <input type="text" [(ngModel)]="formData.company" name="company" required>
        </div>
        <div class="form-group">
          <label>Location</label>
          <input type="text" [(ngModel)]="formData.location" name="location" required>
        </div>
        <div class="form-group">
          <label>Salary (optional)</label>
          <input type="text" [(ngModel)]="formData.salary" name="salary">
        </div>
        <div class="form-group">
          <label>Description</label>
          <button type="button" class="btn btn-secondary" 
                  (click)="generateDescription()" 
                  [disabled]="generatingAI"
                  style="margin-bottom: 10px;">
            {{ generatingAI ? 'Generating...' : 'Generate with AI' }}
          </button>
          <textarea [(ngModel)]="formData.description" name="description" rows="10" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Create Job</button>
      </form>
    </div>
  `
})
export class CreateJobComponent {
  formData = {
    title: '',
    company: '',
    location: '',
    salary: '',
    description: ''
  };
  error = '';
  success = '';
  generatingAI = false;

  constructor(private jobService: JobService, private router: Router) {}

  generateDescription() {
    if (!this.formData.title) {
      this.error = 'Please enter a job title first';
      return;
    }

    this.generatingAI = true;
    this.error = '';

    this.jobService.generateDescription({
      job_title: this.formData.title,
      company_name: this.formData.company
    }).subscribe({
      next: (response) => {
        this.formData.description = response.description;
        this.success = 'AI-generated description ready!';
        this.generatingAI = false;
      },
      error: (err) => {
        this.error = 'Failed to generate description';
        this.generatingAI = false;
      }
    });
  }

  onSubmit() {
    this.error = '';
    this.success = '';

    this.jobService.createJob(this.formData).subscribe({
      next: () => {
        this.success = 'Job created successfully!';
        setTimeout(() => this.router.navigate(['/jobs']), 2000);
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to create job';
      }
    });
  }
}
