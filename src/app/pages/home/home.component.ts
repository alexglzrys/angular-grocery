import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  showButtonLoadProducts = 'block';
  // Paginación
  limit: number = 8;
  offset: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    // Devolver listado de productos paginados
    this.productService.getAllProducts(this.limit, this.offset).subscribe(products => {
      this.offset += this.limit;
      // Sumar al listado actual el nuevo lote de resultados
      if (products.length) {
        this.products = this.products.concat(products);
      } else {
        this.showButtonLoadProducts = 'none';
      }
    })
  }

  loadMoreProducts() {
    this.fetchProducts();
  }
}
