import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../service/auth/auth.service'
import { inject } from '@angular/core';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const autService = inject(AuthService);
  const  authToken = autService.getToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  })
  return next(authReq);
};
