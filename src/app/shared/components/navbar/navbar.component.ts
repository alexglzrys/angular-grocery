import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  faBars = faBars;

  constructor() { }

  ngOnInit(): void {
  }

}
