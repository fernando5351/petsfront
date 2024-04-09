import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { roleRoutes } from './pages/rol/role.routes';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard()] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'rol',
    canActivate: [AuthGuard()],
    children: [
      ...roleRoutes
    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];
