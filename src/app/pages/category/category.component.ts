import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/interfaces/product';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  products: Product[] = [];
  showButtonLoadProducts = 'block';
  productId: string | null = null;

  // pagination
  limit = 8;
  offset = 0;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.resetCategory();
        this.fetchProducts();
      }
    })
    // Suscripción a las cadenas de consulta
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      this.productId = params.get('product');
    })
  }

  fetchProducts() {
    this.productService.getByCategory(this.categoryId!, this.limit, this.offset).subscribe(products => {
      this.offset += this.limit;
      if (products.length) {
        this.products = this.products.concat(products);
        console.log(products)
      } else {
        this.showButtonLoadProducts = 'none';
      }
    })
  }

  resetCategory() {
    this.offset = 0;
    this.products = [];
    this.showButtonLoadProducts = 'block';
  }

}
