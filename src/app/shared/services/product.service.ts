import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { Product } from '../interfaces/product';
import { environment } from '../../../environments/environment';

const API_STORE = environment.api_store;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    const URL = `${API_STORE}/products`;
    return this.http.get<Product[]>(URL).pipe(
      map(products => products.map(product => ({...product, 'date': this.getRandomDate()})))
    )
  }

  private getRandomDate() {
    const maxDate = Date.now();
    const timestamp = Math.floor(Math.random() * maxDate);
    return new Date(timestamp);
  }
}
