import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './shared/components/products/products.component';
import { CmsModule } from './cms/cms.module';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { 
    path: 'cms', 
    loadChildren: () => import('./cms/cms.module').then(m => CmsModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
