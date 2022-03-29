import { faShoppingCart, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import SwiperCore, { Pagination, SwiperOptions } from 'swiper';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';

// Instalar módulos independientes de Swiper
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  faTimesCircle = faTimesCircle;
  myShoppingCart: Product[] = [];
  //count: number = 0;
  total: number = 0;
  products: Product[] = [];
  product!: Product;
  showSidebarProductDetail: boolean = false;
  config: SwiperOptions = {
    slidesPerView: 1,
    pagination: {
      clickable: true,
    },
    autoplay: true,
  }

  constructor(private storeService: StoreService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.myShoppingCart = this.storeService.getMyShoppingCart();
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
      console.log(products)
    })
  }

  addToShoppingCart(product: Product) {
    this.showSidebarProductDetail = false;
    this.storeService.addToShoppingCart(product);
    //this.count = this.storeService.getNumberProducts();
    this.total = this.storeService.getTotal();
  }

  toggleSidebarProductDetail() {
    this.showSidebarProductDetail = !this.showSidebarProductDetail;
  }

  getProduct(id: string) {
    this.productService.getProduct(id).subscribe(product => {
      
      this.product = product;
     // this.toggleSidebarProductDetail();
     this.showSidebarProductDetail = true;
      console.log(product)
    });
  }
}
