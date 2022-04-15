import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { WebsiteModule } from '../website.module';
import { CategoryComponent } from './pages/category/category.component';


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    WebsiteModule
  ]
})
export class CategoriesModule { }
