import { Component, OnInit, ViewChild, ElementRef, Query } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../../../shared/interfaces/product';
import { ProductService } from '../../../shared/services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  showButtonLoadProducts = 'block';
  productId: string | null = null;
  // Paginación
  limit: number = 8;
  offset: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.productId = params.get('product');
      console.log(this.productId);
    })
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
