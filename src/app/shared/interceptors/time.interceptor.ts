import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

/**
 * Por defecto los interceptores interceptan culquier petición HTTP
 * Sin embargo, para seleccionar que peticiones se deben interceptar es neesario
 * crar un contexto para activar o desactivar el interceptor.
 */

// Indicamos que por defecto este interceptor va a estar desactivado para cualquier petición HTTP
// ! Si se desea cambiar el comportamiento (para que este siempre activo en toda solicitud), solo colocamos true y en la función colocamos false para aquellos metodos en el servico que no desean ser interceptados
const CHECK_TIME = new HttpContextToken<boolean>(() => false);

// Función que activa el interceptor.
// Esta función debe ser invocada desde el algún método decladaro en el servicio, que desee interceptar su solicitud
export function activateCheckTime() {
  return new HttpContext().set(CHECK_TIME, true);
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // ? Para interceptores que tienen un contexto, es necesario evaluarlo para interceptar la petición o no

    if (request.context.get(CHECK_TIME)) {
      // Determinar el tiempo en MS que le toma una solicitud HTTP
      const start = performance.now();
      return next.handle(request).pipe(
        tap(() => {
          const time = (performance.now() - start) + 'ms.';
          console.log(request.url, time); 
        })
      );
    }
    
    // ? Si el interceptor se encuentra desactivado para la petición actual, dejamos pasar la petición tal cual 
    return next.handle(request);
  }
}
