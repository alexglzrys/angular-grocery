import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsComponent } from './components/products/products.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductImageComponent,
    ProductsComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ProductsComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
