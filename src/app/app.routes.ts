import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth/auth.guard';

 export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard()] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(r => r.AuthRoutes)
  },
  {
    path: 'rol',
    canActivate: [AuthGuard()],
    loadChildren: () => import('./pages/rol/role.routes').then(r => r.roleRoutes)
  },
  {
    path: 'user',
    canActivate: [AuthGuard()],
    loadChildren: () => import('./pages/user/user.routes').then(r => r.userRoutes),
  },
  {
    path: 'pets',
    canActivate: [AuthGuard()],
    loadChildren: () => import('./pages/pets/pets.routes').then(r => r.PetsRouter),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
