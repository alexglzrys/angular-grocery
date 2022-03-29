import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  //count: number = 0;
  total: number = 0;
  products: Product[] = [];
  product!: Product;
  showSidebarProductDetail: boolean = false;

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
    this.storeService.addToShoppingCart(product);
    //this.count = this.storeService.getNumberProducts();
    this.total = this.storeService.getTotal();
  }

  getProduct(id: string) {
    this.showSidebarProductDetail = true;
    this.productService.getProduct(id).subscribe(product => {
      this.product = product;
      console.log(product);
    });
  }
}
