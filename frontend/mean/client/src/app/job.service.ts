import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs`);
  }

  createJob(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/jobs`, data);
  }

  generateDescription(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ai/generate-description`, data);
  }
}
