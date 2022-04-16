import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Mandarina';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Si el usuario recarga la página, me interesa saber si esta logeado para pintar su información de perfil de usuario
    // Todo ello actualizando el valor del Observable user$
    this.authService.profile().subscribe();
  }

}
