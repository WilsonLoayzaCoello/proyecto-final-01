import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./login/login.component'),
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () => import('./register/register.component'),
  }
];
