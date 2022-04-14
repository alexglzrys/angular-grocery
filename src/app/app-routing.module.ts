import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './shared/components/products/products.component';
import { CmsModule } from './cms/cms.module';
import { PagesModule } from './pages/pages.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => PagesModule)
  },
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(m => CmsModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => PagesModule)
  },
  {
    path: '**',
    component: NotFoundComponent
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
