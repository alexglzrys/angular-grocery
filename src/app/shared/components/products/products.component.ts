import { faShoppingCart, faTimesCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../interfaces/product';
import SwiperCore, { Pagination, SwiperOptions } from 'swiper';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

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
  faSpinner = faSpinner;
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

  // Paginación
  limit: number = 8;
  offset: number = 0;
  @ViewChild('btnLoad') btnLoad!: ElementRef;

  // Estado de la petición (nula, cargando, completada)
  statusRequest: null | 'loader' | 'complete' = null;

  constructor(private storeService: StoreService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.myShoppingCart = this.storeService.getMyShoppingCart();
    this.fetchProducts();
  }

  fetchProducts() {
    // Devolver listado de productos paginados
    this.productService.getAllProducts(this.limit, this.offset).subscribe(products => {
      this.offset += this.limit;
      // Sumar al listado actual el nuevo lote de resultados
      if (products.length) 
        this.products = this.products.concat(products);
      else
        this.btnLoad.nativeElement.style.display = 'none';
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
    this.statusRequest = 'loader';
    this.productService.getProduct(id).subscribe({
      next: product => {
        this.product = product;
        // this.toggleSidebarProductDetail();
        this.showSidebarProductDetail = true;
        console.log(product)
      }, 
      error: (e) => {
        // Responder al error decorado por el servicio
        Swal.fire({
          title: 'Lo sentimos',
          text: e,
          icon: 'error',
        confirmButtonText: 'Aceptar'
        })
      }
    }).add(() => {
      // Tras finalizar o completar la petición, hacer tareas de limipieza 
      // ? En peticiones http, el módulo HttpClient de Angular automáticamente finaliza la suscripción después de que finalice la petición 
      this.statusRequest = 'complete';
    });
  }

  loadMoreProducts() {
    this.fetchProducts();
  }
}
