import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OnExit } from '../shared/interfaces/on-exit';

@Injectable({
  providedIn: 'root'
})
export class ExitGuard implements CanDeactivate<unknown> {
  /**
   * Este tipo de guardían permite verificar si el usuaro
   * puede o no abandonar la ruta actual.
   *
   * Es práctico en secciones donde se tiene la captura de información de un formulario
   * para alertar al usuario que no debe abandonar la sección hasta que los datos sean guardados.
   *
   * ? Quiza una bandera cuando la data se envía al servicio, y este tarda un poco en responder
   * No sería bueno que el usuario abandonara la página, hasta que termine el proceso.
  */

  canDeactivate(
    component: OnExit,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // ? La lógica para saber si se puede salir o no de la ruta actual se encuentra definida en el componente de ruta
      // A través del método jsOnExit
      return component.jsOnExit ? component.jsOnExit() : false;
  }

}
