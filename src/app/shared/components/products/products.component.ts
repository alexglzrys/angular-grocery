import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() products!: Product[];
  @Input() showButtonLoadProducts!: string;
  @Output() loadProducts = new EventEmitter<null>();

  faSpinner = faSpinner;

  total: number = 0;
  product!: Product;
  showSidebarProductDetail: boolean = false;
  // Estado de la petición (nula, cargando, completada)
  statusRequest: null | 'loader' | 'complete' = null;

  constructor(private storeService: StoreService,
              private productService: ProductService) { }

  ngOnInit(): void { }

  addToShoppingCart(product: Product) {
    this.showSidebarProductDetail = false;
    this.storeService.addToShoppingCart(product);
    this.total = this.storeService.getTotal();
  }

  getProduct(id: string) {
    this.statusRequest = 'loader';
    this.productService.getProduct(id).subscribe({
      next: product => {
        this.product = product;
        this.showSidebarProductDetail = true;
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
    // Solicitar la busqueda de más productos
    this.loadProducts.emit();
  }

  closeSidebarProductDetail() {
    this.showSidebarProductDetail = false;
  }
}
