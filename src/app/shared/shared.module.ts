
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { ProductSidebarComponent } from './components/product-sidebar/product-sidebar.component';
import { ProductsComponent } from './components/products/products.component';
import { RouterModule } from '@angular/router';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductImageComponent,
    ProductSidebarComponent,
    ProductsComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SwiperModule,
    RouterModule
  ],
  exports: [
    ProductCardComponent,
    ProductImageComponent,
    ProductSidebarComponent,
    ProductsComponent,
    TimeAgoPipe
  ]
})
export class SharedModule { }
