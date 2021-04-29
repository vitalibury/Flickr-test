import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { fbAuthResponse, User } from '../shared/interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = false;

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string | null {
    const expiresDate = new Date(localStorage.getItem('flickr-token-exp') as string);
    if (new Date > expiresDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('flickr-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.backendKey}`, user)
    .pipe(
      tap(this.setToken),
      catchError(this.handleError.bind(this))
      );
  }

  handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        alert('Такого email не существует');
      break
      case 'INVALID_EMAIL':
        alert('Введите корректный email');
      break
      case 'INVALID_PASSWORD':
        alert('Введите корректный пароль');
      break
    }
    return throwError(error);
  }

  logout() {
    this.setToken(null);
    this.router.navigate(['./profile']);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: fbAuthResponse | null) {
    if(response) {
      const expiresDate = new Date(new Date().getTime() + +(response.expiresIn as string) * 1000);
      localStorage.setItem('flickr-token', response.idToken as string);
      localStorage.setItem('flickr-token-exp', expiresDate.toString());
      this.isLogin = true;
    } else {
      localStorage.clear();
      this.isLogin = false;
    }

  }
}
