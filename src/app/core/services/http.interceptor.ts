import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const obj = {
      setHeaders: {
        'ngsw-bypass': 'true',
      },
    } as any;
    // if (
    //   this.identityService.identity &&
    //   this.identityService.identity.AccessToken
    // ) {
    //   Object.assign(obj.setHeaders, {
    //     Authorization: `Bearer ${this.identityService.identity.AccessToken}`,
    //   });
    // }

    if (request.headers.has('skip')) {
      request = request.clone({
        headers: request.headers.delete('skip'),
      });
      return next.handle(request);
    }

    request = request.clone(obj);
    return next.handle(request).pipe(
      catchError((error: any, caught: Observable<HttpEvent<any>>) => {
        if (error.status === 401) {
          const loader = document.getElementById('app-loader');
          if (loader) {
            document.body.removeChild(loader);
          }
          // this.identityService.logout();
          const url = '/login?un-authorized=' + new Date().getTime();
          setTimeout(() => (window.location.href = url), 1000);
          // setTimeout(() => this.router.navigateByUrl(url), 1000);
          // if you've caught / handled the error, you don't
          // want to rethrow it unless you also want
          // downstream consumers to have to handle it as
          // well.
          return of(error);
        }
        throw error;
      })
    );
  }
}
