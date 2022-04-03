import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { StoreService } from '../../services/store.service';
import { User } from '../../dtos/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  faBars = faBars;
  faTimesCircle = faTimesCircle

  activeSidebar = false;
  countProducts: number = 0;

  profile: User | null = null;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    // Suscribirnos al Observable del carrito de compras 
    // Para determinar cuantos productos hay actualmente dentro del carrito de forma REACTIVA
 
    // Si bien existe un método en el servicio para saber eso, en este caso al suscribirse pordemos obtener lo mismo pero con la logica declarada en este componente (subscritor)
    this.storeService.myShoppingCart$.subscribe(products => {
      this.countProducts = products.length;
    });
    this.isLogged();
  }

  // Ocultar o mostrar el sidebar en modo mobile
  toggleSidebar() {
    this.activeSidebar = !this.activeSidebar;
  }

  isLogged() {
    const profile = window.localStorage.getItem('profile') || null;
    if (profile) 
      this.profile = JSON.parse(profile);
  }

}
