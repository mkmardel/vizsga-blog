import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      !request.headers.has('Content-Type') &&
      !(request.body instanceof FormData)
    ) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }
    return next.handle(request);
  }
}
