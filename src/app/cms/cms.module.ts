import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { CmsRoutingModule } from './cms-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CreateProductComponent,
    EditProductComponent,
    ListProductComponent,
    NavbarComponent,
    LayoutComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CmsModule { }
