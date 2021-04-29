import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private route: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes(environment.flickrUrl)) { //Except finding images
      return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
        console.log('Interceptor Error', error);
        if(error.status === 401) {
          this.auth.logout();
          this.route.navigate(['./profile']);
        }
        return throwError(error);
      }))
    } else {
      if(this.auth.isAuthenticated()) {
        req = req.clone({
          setParams: {
            auth: this.auth.token as string
          }
        });
      }
      return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
        console.log('Interceptor Error', error);
        if(error.status === 401) {
          this.auth.logout();
          this.route.navigate(['./profile']);
        }
        return throwError(error);
      }))
    }
    }

}
