import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CategoryComponent } from './category/category.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ProfileComponent } from './profile/profile.component';
import { MyShoppingCartComponent } from './my-shopping-cart/my-shopping-cart.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [RegisterComponent, LoginComponent, HomeComponent, NotFoundComponent, CategoryComponent, RecoveryComponent, ProfileComponent, MyShoppingCartComponent, LayoutComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class PagesModule { }
