import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const publicKey = 'FLWPUBK_TEST-0b04581c8d73fd08d5c720e1e0f803b4-X'
@Injectable()
export class LibInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    request = request.clone({
      setHeaders: {
        "Authorization": "Bearer FLWSECK_TEST-64eba57b307c760bc92923c3071859f4-X"
      }
    });
    return next.handle(request);
  }
}
