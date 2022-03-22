import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product;
  faShoppingCart = faShoppingCart
 
  constructor() { }

  ngOnInit(): void {
  }

  imageLoaded(url: string) {
    console.log('Imagen cargada desde:', url)
  }

}
