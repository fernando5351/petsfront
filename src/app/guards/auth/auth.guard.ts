import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { inject } from '@angular/core';

// Define tu función canActivate
export const AuthGuard = () => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
    const authService = inject(AuthService);
    const router = inject(Router);
    console.log(authService.getToken());
    console.log('soy canActivate');

    if (authService.getToken() !== null) {
      return true;
    } else {
      return router.createUrlTree(['login']); // Devuelve la UrlTree para redirigir al usuario a la página de inicio de sesión
    }
  };
};
