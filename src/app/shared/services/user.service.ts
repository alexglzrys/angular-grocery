import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User, CreateUserDTO } from '../dtos/user';

const API_URL = environment.api_store;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  create(dto: CreateUserDTO): Observable<User> {
    const URL = `${API_URL}/users`;
    return this.http.post<User>(URL, dto);
  }

  getAll(): Observable<User[]> {
    const URL = `${API_URL}/users`;
    return this.http.get<User[]>(URL);
  }
}
