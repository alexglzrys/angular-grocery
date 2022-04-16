import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy {

  constructor() { }

  preload(route: Route, load: () => Observable<any>): Observable<any> {

    // Vetificar si la ruta debe ser precargada. Esto se usa con precargas personalizadas.
    // ! Es necesario que en la definición de rutas (lazy load) se indique una bandera booleana en la data de la misma

    if (route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}
