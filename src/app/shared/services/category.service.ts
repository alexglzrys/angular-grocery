import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category } from '../interfaces/category';
import { Observable } from 'rxjs';

const API_URL = environment.api_store;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    const URL = `${API_URL}/categories`;
    return this.http.get<Category[]>(URL);
  }

}
