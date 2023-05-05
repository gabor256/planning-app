import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private router : Router, private authService:AuthService) {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form : NgForm) {
    if (!form.valid) { // Ez extra validáció ha valaki hackelni akar
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
      form.reset();
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      });
      form.reset();
    }

  onHandleError() {
    this.error = null;
  }
}