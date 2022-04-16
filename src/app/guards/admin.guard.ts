import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // ? Esta es otra forma de saber si el usuario se encuentra logeado o no.
      // * El Observable user$ tendrá información de un usuario si esta logeado o nulo si no lo esta
      // Sumado a lo anterior, si el usuario tiene rol de admin lo dejamos pasar. caso contrario, le negamos el acceso
      return this.authService.user$.pipe(
        map(user => {
          if (user?.role === 'admin') {
            return true;
          }
          this.router.navigateByUrl('/');
          return false;
        })
      );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.user$.pipe(
        map(user => {
          if (user?.role === 'admin') {
            return true;
          }
          this.router.navigateByUrl('/');
          return false;
        })
      );
  }
}
