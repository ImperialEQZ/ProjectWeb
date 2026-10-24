import { Routes } from '@angular/router';
import { Auth } from '../shared/components/auth/auth';
import { Index } from '../shared/components/index';
import { Product } from '../shared/components/product/product';

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
    path: 'auth',
    component: Auth,
  },
  {
    path: 'product',
    component: Product,
  },
];
