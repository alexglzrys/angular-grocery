import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auth } from '../dtos/auth';
import { User } from '../dtos/user';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';

const API_URL = environment.api_store;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Observable para indicar si hay o no un usuario autenticado.
  // Por defecto no hay usuario logeado.
  private userSource = new BehaviorSubject<User | null>(null);
  user$ = this.userSource.asObservable();

  constructor(private http: HttpClient,
              private tokenService: TokenService) { }

  login(email: string, password: string): Observable<Auth> {
    const URL = `${API_URL}/auth/login`;
    return this.http.post<Auth>(URL, {email, password}).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) return throwError(() => new Error('Credenciales incorrectas'));
        if (error.status === HttpStatusCode.InternalServerError) return throwError(() => new Error('Error interno en el servidor'));
        return throwError(() => new Error('Upss! algo ha salido mal'));
      })
    );
  }

  // Evitando el Callback Hell - Al momento de logear y obtener el perfil de usuario
  loginAndProfile(email: string, password: string): Observable<User> {
    const URL = `${API_URL}/auth`;
    return this.http.post<Auth>(`${URL}/login`, {email, password}).pipe(
      switchMap(auth => {
        this.tokenService.saveToken(auth.access_token);
        return this.http.get<User>(`${URL}/profile`);
      }),
      // De forma secundaria, si el usuario esta logeado (hay token), le indicamos al observable que actualice su valor con los datos del usuario. De esta forma quien este suscrito, escuchará esos cambios
      tap(user => {
        if (user) {
          this.userSource.next(user)
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) return throwError(() => new Error('Credenciales incorrectas'));
        if (error.status === HttpStatusCode.InternalServerError) return throwError(() => new Error('Error interno en el servidor'));
        return throwError(() => new Error('Upss! algo ha salido mal'));
      })
    );
  }

  profile(): Observable<User> {
    const URL = `${API_URL}/auth/profile`;

    // El token en esta petición se agrega mediante el uso de un interceptor
    return this.http.get<User>(URL).pipe(
      // De forma secundaria, si el usuario esta logeado (hay token), le indicamos al observable que actualice su valor con los datos del usuario. De esta forma quien este suscrito, escuchará esos cambios
      tap(user => {
        if (user) {
          this.userSource.next(user)
        }
      })
    );
  }

  isLogged(): User | null {
    const profile = localStorage.getItem('profile') || null;
    if (profile)
      return JSON.parse(profile);
    return null;
  }

  logout(): void {
    this.tokenService.removeToken();
    this.userSource.next(null);
  }
}
