import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as AuthActions from './auth.actions';
import {catchError, map, of, switchMap} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

export interface AuthResponseData {
  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  idToken: string;        //	A Firebase Auth ID token for the newly created user.
  email: string;          //	The email for the newly created user.
  refreshToken: string;   //	A Firebase Auth refresh token for the newly created user.
  expiresIn: string;      //	The number of seconds in which the ID token expires.
  localId: string;        //	The uid of the newly created user.
  registered?: boolean;   //	Whether the email is for an existing account.
}

@Injectable()
export class AuthEffects {
  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http.post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey, {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          })
          .pipe(
            map(resData => {
              const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000); // a másodpercet milli-re kell konvertálni
              return of(new AuthActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate
              }));
            }),
            catchError(error => {
              return of();
            })
          );
      })
    );
  });

  constructor(private actions$: Actions, private http: HttpClient) {
  }
}
