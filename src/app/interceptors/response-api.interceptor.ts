import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export const responseApiInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const routerService = inject(Router);

  return next(req).pipe(
    catchError((response: HttpErrorResponse) => {
      if (response.status === 401) {
        Swal.fire({
          title:  'Acceso no autorizado',
          text: response.message,
          icon: 'error',
          position: 'top-end',
          toast: true,
        });
        authService.logOut();
      }
      if (response.status === 423) {

      }
      return throwError(()=> response.error);
    })
  );
};
