import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="card" style="max-width: 400px; margin: 50px auto;">
      <h2>Register</h2>
      <div *ngIf="error" class="error">{{ error }}</div>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Name</label>
          <input type="text" [(ngModel)]="name" name="name" required>
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="email" name="email" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" [(ngModel)]="password" name="password" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Register</button>
      </form>
      <p style="margin-top: 20px; text-align: center;">
        Already have an account? <a routerLink="/login">Login</a>
      </p>
    </div>
  `
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register({ name: this.name, email: this.email, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/jobs']),
        error: (err) => this.error = err.error?.error || 'Registration failed'
      });
  }
}
