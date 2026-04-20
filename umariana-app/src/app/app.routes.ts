import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: () => import('./pages/inicio-component/inicio-component').then(m => m.InicioComponent)},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
