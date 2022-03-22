import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsComponent } from './components/products/products.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductImageComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class SharedModule { }
