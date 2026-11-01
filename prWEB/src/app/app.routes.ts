import { Routes } from '@angular/router';
import { Auth } from '../shared/components/auth/auth';
import { Index } from '../shared/components/index';
import { Product } from '../shared/components/product/product';
import { About } from '../shared/components/about/about';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: Index,
  },
  {
    path: 'product/:id',
    component: Product,
  },
  {
    path: 'auth',
    component: Auth,
  },
  {
    path: 'about',
    component: About,
  },
];
