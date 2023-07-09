import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as AuthActions from './auth.actions';
import {catchError, map, of, switchMap, tap, throwError} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

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
              return new AuthActions.LoginSuccess({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate
              });
            }),
            catchError(errorRes => {
              let errorMessage = 'Unknown error occured!';
              if (!errorRes.error || !errorRes.error.error) {
                return of(new AuthActions.LoginFail(errorMessage));
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
              return of(new AuthActions.LoginFail(errorMessage));
            })
          );
      })
    );
  });

  authSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_SUCCESS),
      tap(() => {
        this.router.navigate(['/']);
      })
    ),
      {dispatch: false}
  )

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {
  }
}
