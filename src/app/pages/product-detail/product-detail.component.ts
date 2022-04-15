import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { SwiperOptions } from 'swiper';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/interfaces/product';
import { StoreService } from '../../shared/services/store.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// Instalar módulos independientes de Swiper
SwiperCore.use([Pagination, Autoplay]);

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;

  faShoppingCart = faShoppingCart;

  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    loop: true
  }

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private storeService: StoreService,
              private location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = params.get('id');
      this.fetchProduct();
    })
  }

  fetchProduct() {
    this.productService.getProduct(this.productId!).subscribe(product => {
      this.product = product;
    })
  }

  addToShoppingCart() {
    this.storeService.addToShoppingCart(this.product!);
  }

  goToBack() {
    // Regresar atrás
    this.location.back();
  }

}
