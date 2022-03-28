import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

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

  constructor() { }

  ngOnInit(): void {
  }

  // Ocultar o mostrar el sidebar en modo mobile
  toggleSidebar() {
    this.activeSidebar = !this.activeSidebar;
  }

}
