import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';


export const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/mod-formulario/formulario.module#FormularioModule'
  },



];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);

