import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product;
  faShoppingCart = faShoppingCart

  @Output() onAddToCart: EventEmitter<Product> = new EventEmitter<Product>();
 
  constructor() { }

  ngOnInit(): void {
  }

  imageLoaded(url: string) {
    console.log('Imagen cargada desde:', url)
  }

  addToCart() {
    // Informar al componente padre que producto se ha decidido agregar al carrito de la compra
    this.onAddToCart.emit(this.product);
  }
}
