import { HttpInterceptorFn } from '@angular/common/http';

export const htppInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
