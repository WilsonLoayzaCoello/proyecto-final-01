import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/pages.component'),
    children: [
      {
        path: 'progress',
        title: 'Progress',
        loadComponent: () => import('./pages/progress/progress.component'),
      },
      {
        path: 'grafica',
        title: 'Grafica',
        loadComponent: () => import('./pages/grafica1/grafica1.component'),
      },

    ],
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () => import('./auth/register/register.component'),
  },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./auth/login/login.component'),
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', loadComponent: () => import('./nopagefound/nopagefound.component')},
];
