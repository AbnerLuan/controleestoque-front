import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../service/spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.showSpinner();
    let token = localStorage.getItem('token');
    if (token) {
      const cloneReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) })
      return next.handle(cloneReq).pipe(
        finalize(() => this.spinnerService.hideSpinner())
      );
    } else {
      return next.handle(request).pipe(
        finalize(() => this.spinnerService.hideSpinner())
      );
    }
  }
}

export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]
