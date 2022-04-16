import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './shared/services/custom-preload.service';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { AdminGuard } from './guards/admin.guard';

/**
 * Lazy Loading:
 * Permite cargar módulos bajo petición del usuario de forma perezosa. Esto es posible gacias a la modularización de nuestra aplicación.
 *
 * ! Nota
 * Dividir el main.js principal de la aplicación en varios pedazos (uno por cada módulo Lazy loading), hace que nuestra aplicación principal cargue más rápido, sin embargo, en redes lentas esto puede jugar a favor o en contra, ya tardará en descargar cada módulo.
 *
 * ? En estos casos lo que conviene es pre-cargar los módulos de la aplicación.
 * Para ello existen muchas estraegias, las cuales dependen de la complejidad y tamaño de la aplicación.
 * Esta configuración se hace en el registro de rutas principales de la aplicación
 *
 * * Precargar todos los módulos:
 * Cuando termine de cargar toda la página, comenzará a precargar el resto de los módulos de la aplicación de forma automática. (Aplicaciones de tamaño medio)
 *
 * * Precarga bajo estrategia personalizada:
 * Indicamos en las rutas (lazy load) de nuestra aplicación, cuales de ellas se deberías pre-cargar, y el resto de ellas solo se cargarán bajo demanda del usuario.
 * Para ello necesitamos de un servicio que nos sirva de condicional para precargar o no la ruta en cuestión (Aplicaciones grandes)
 */

const routes: Routes = [
  {
    path: 'site',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data: {
      // Este módulo de ruta debe ser precargado desde el inicio
      preload: true
    }
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    canLoad: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '',
    redirectTo: 'site',
    pathMatch: 'full'
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
    RouterModule.forRoot(routes, {
      // Estrategia para pre-cargar todos los módulos restantes una vez descargado la aplicación
      // preloadingStrategy: PreloadAllModules

      // Estrategia para precargar ciertos módulos, el resto será bajo demanda
      // La lógica se encuentra declarada en el servicio que se le pasa como valor
      preloadingStrategy: CustomPreloadService

      // Estrategia para precargar módulos con base al API Observable del Browser
      // Solo se precargan los módulos cuyos enlaces estén visibles en el VIEWPORT del navegador. Esta técnica no es propia de angular, pero la librería da la ventaja que solo se precarguen aquellos módulos que son necesarios para el usuario con base en su interactividad de nevegación. Es útil para dashboard administrativos dónde los enlaces a ciertos recursos difieren del rol del usuario.

      // !El módulo de esta estrategia ha de ser importado y exportado en aquellos módulos que hacen carga diferida (lazy load)
      // ? Al parecer solo la librería funciona cuando todo un módulo hace cargas diferidas, ya que si están mezclados algunos paths. Se cicla
      // preloadingStrategy: QuicklinkStrategy
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
