import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auth } from '../dtos/auth';

const API_URL = environment.api_store;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Auth> {
    const URL = `${API_URL}/auth/login`;
    return this.http.post<Auth>(URL, {email, password});
  }
}
