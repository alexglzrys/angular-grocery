import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product';
import { faShoppingCart, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import SwiperCore, { Pagination } from 'swiper';
import { SwiperOptions } from 'swiper';

// Instalar módulos independientes de Swiper
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.scss']
})
export class ProductSidebarComponent implements OnInit {

  @Input() product!: Product;
  @Input() showMe!: boolean

  @Output() closeMe = new EventEmitter<null>();
  @Output() addToCart = new EventEmitter<Product>();

  faShoppingCart = faShoppingCart;
  faTimesCircle = faTimesCircle;

  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: {
      clickable: true,
    },
    autoplay: true,
  }

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeMe.emit();
  }

  addToShoppingCart() {
    this.addToCart.emit(this.product);
  }
}
