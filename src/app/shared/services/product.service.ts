import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, zip } from 'rxjs';
import { map, retry, catchError, switchMap } from 'rxjs/operators'
import { Product } from '../interfaces/product';
import { environment } from '../../../environments/environment';
import { CreateProductDTO, UpdateProductDTO } from '../dtos/product';

const API_STORE = environment.api_store;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(limit?: number, offset?: number): Observable<Product[]> {
    const URL = `${API_STORE}/products`;

    // Los parámetros de ruta son opcionales en el endPoint, estos permiten realizar paginación
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.append('limit', limit!);
      params = params.append('offset', offset!);
    }

    return this.http.get<Product[]>(URL, { params }).pipe(
      // En caso de error, reintentar 3 veces más por si alguna de las peticiones falla (redes inestables)
      retry(3),
      // Transformar la respuesta que retorna el API (Agregar fecha de publicación e impuestos calculados)
      // Me interesa retornar un arreglo de Productos, por eso uso el map de los arreglos JS nativo
      map(products => products.map(product => ({...product, 'date': this.getRandomDate(), 'taxes': this.calculateTaxes(product.price)})))
    )
  }

  getProduct(id: string): Observable<Product> {
    const URL = `${API_STORE}/products/${id}`;
    // Se recomienda controlar los errores directamente desde el servicio
    return this.http.get<Product>(URL).pipe(
      // Transformar el flujo en un arreglo (map), y como solo es un Producto, lo transformo para agregarle más propiedades
      map(product => ({...product, 'date': this.getRandomDate(), 'taxes': this.calculateTaxes(product.price)})),
      catchError((error: HttpErrorResponse) => {
        // Decorar el mensaje de error con base al código de estado de la respuesta
        if (error.status === HttpStatusCode.NotFound) return throwError(() => new Error('El producto no fue localizado'));
        if (error.status === HttpStatusCode.Unauthorized) return throwError(() => new Error('No tiene autorización para ver el producto'));
        if (error.status === HttpStatusCode.InternalServerError) return throwError(() => new Error('Se ha presentado un problema interno en el servidor'));
        return throwError(() => new Error('Ups! algo ha salido mal'));
      })
    );
  }

  create(dto: CreateProductDTO): Observable<Product> {
    const URL = `${API_STORE}/products`;
    return this.http.post<Product>(URL, dto);
  }

  update(id: string, dto: UpdateProductDTO): Observable<Product> {
    const URL = `${API_STORE}/products/${id}`;
    return this.http.put<Product>(URL, dto);
  }

  delete(id: string): Observable<boolean> {
    const URL = `${API_STORE}/products/${id}`;
    return this.http.delete<boolean>(URL);
  }

  // ! Evitar el Callback Hell - Observables
  // ? Operador switchMap() - Para peticiones que dependen una de la otra
  // ? zip() - Para peticiones que no tienen dependencia (equivalente a Promise.all())
  //          * El resultado en zip es un Observable de tipo arreglo, cada elemento representa la respuesta ordenada de cada petición 

  findAndUpdateAndDelete(id: string, dto: UpdateProductDTO): Observable<boolean> {
    const URL = `${API_STORE}/products/${id}`;
    return this.http.get<Product>(URL).pipe(
      switchMap(product => this.http.put<Product>(URL, dto)),
      switchMap(productUpdated => this.http.delete<boolean>(URL))
    );
  }

  createUpdateDeleteList(createProduct: CreateProductDTO, 
                         idProductUpdate: string, 
                         updateProduct: UpdateProductDTO, 
                         idProductDeleted: string): Observable<[Product, Product, boolean, Product[]]> {
    const URL = `${API_STORE}/products`;
    return zip([
      this.http.post<Product>(URL, createProduct),
      this.http.put<Product>(`${URL}/${idProductUpdate}`, updateProduct),
      this.http.delete<boolean>(`${URL}/${idProductDeleted}`),
      this.http.get<Product[]>(URL)
    ])
  }


  private getRandomDate() {
    const maxDate = Date.now();
    const timestamp = Math.floor(Math.random() * maxDate);
    return new Date(timestamp);
  }

  private calculateTaxes(price: number): number {
    return price * 0.16;
  }
}
