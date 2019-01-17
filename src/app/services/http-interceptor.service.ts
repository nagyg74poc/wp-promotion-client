import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('JWT')) { // e.g. if token exists, otherwise use incomming request.
      return next.handle(req.clone({
        setHeaders: {
          'X-AUTH-TOKEN': localStorage.getItem('JWT'),
        }
      }));
    } else {
      return next.handle(req);
    }
  }
}
