import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    const GlobalRequest = request.clone({
      headers:request.headers.set('Authorization','Bearer ' )
    })

    return next.handle(request);
  }
}
