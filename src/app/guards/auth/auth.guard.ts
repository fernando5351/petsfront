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
      router.navigate(['login']);
      return false;
    }
  };
};
