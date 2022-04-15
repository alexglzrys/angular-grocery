import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { WebsiteRoutingModule } from './website-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RegisterComponent } from './pages/register/register.component';
import { MyShoppingCartComponent } from './pages/my-shopping-cart/my-shopping-cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { HomeComponent } from './pages/home/home.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { ProductSidebarComponent } from './components/product-sidebar/product-sidebar.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    RecoveryComponent,
    ProfileComponent,
    MyShoppingCartComponent,
    LayoutComponent,
    ProductDetailComponent,
    TimeAgoPipe,
    FooterComponent,
    NavbarComponent,
    ProductsComponent,
    ProductCardComponent,
    ProductImageComponent,
    ProductSidebarComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    WebsiteRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SwiperModule
  ],
  exports: [
    ProductsComponent,
  ]
})
export class WebsiteModule { }
