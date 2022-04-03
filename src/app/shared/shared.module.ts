
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsComponent } from './components/products/products.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductImageComponent,
    ProductsComponent,
    NavbarComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SwiperModule,
    RouterModule,
  ],
  exports: [
    ProductsComponent,
    NavbarComponent,
    RouterModule
  ]
})
export class SharedModule { }
