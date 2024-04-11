import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { inject } from '@angular/core';

export const AuthGuard = () => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const token = authService.getToken();
    if (token) {
      return true;
    } else {
      router.navigate(['login']);
      return false;
    }
  };
};
