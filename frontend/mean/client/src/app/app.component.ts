import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <div class="nav-container">
        <a routerLink="/" class="brand">Job Platform</a>
        <div>
          <ng-container *ngIf="authService.isLoggedIn()">
            <a routerLink="/jobs">Jobs</a>
            <a routerLink="/create-job">Create Job</a>
            <span style="color: white; margin-left: 20px;">Welcome, {{ authService.getUser()?.name }}</span>
            <button (click)="logout()" style="background-color: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; margin-left: 20px;">Logout</button>
          </ng-container>
          <ng-container *ngIf="!authService.isLoggedIn()">
            <a routerLink="/login">Login</a>
            <a routerLink="/register">Register</a>
          </ng-container>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
