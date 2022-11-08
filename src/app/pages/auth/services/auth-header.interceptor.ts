import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor() {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



  const authReq = request.clone({
    // headers: request.headers.set('Content-Type', 'application/x-www-form-urlencoded'),

  });
    return next.handle(authReq).pipe(
      catchError(error => {
        console.error("error is intercept", error);
        return throwError(error.message);
      })
    );;
  }
}
