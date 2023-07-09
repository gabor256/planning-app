import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment.development";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  idToken: string;        //	A Firebase Auth ID token for the newly created user.
  email: string;          //	The email for the newly created user.
  refreshToken: string;   //	A Firebase Auth refresh token for the newly created user.
  expiresIn: string;      //	The number of seconds in which the ID token expires.
  localId: string;        //	The uid of the newly created user.
  registered?: boolean;   //	Whether the email is for an existing account.
}

@Injectable({providedIn: 'root'})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private router: Router, private http: HttpClient, private store: Store<fromApp.AppState>) {
  }

  // Ez a Firebase setup a signup-hoz
  signup(email: string, password: string) {
    // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),
      tap(response => {
          this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
        }
      )
    );
  }

  login(email: string, password: string) {
    // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),
      tap(response => {
          this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
        }
      )
    );
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      // this.user.next(loadedUser);
      this.store.dispatch(new AuthActions.LoginSuccess({email: loadedUser.email, userId: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate)}));
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000); // a másodpercet milli-re kell konvertálni
    const user = new User(email, userId, token, expirationDate);
    // this.user.next(user);
    this.store.dispatch(new AuthActions.LoginSuccess({email: email, userId: userId, token: token, expirationDate: expirationDate}));
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorRes);
    }
    console.log(errorRes);
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "This email already exists!";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This user does not exists!";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "Invalid password!";
        break;
    }
    return throwError(errorMessage);
  }

}
