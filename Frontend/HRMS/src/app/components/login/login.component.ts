import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _authService : AuthService, 
    private _router : Router,
    private _cdr: ChangeDetectorRef,
  ){

  }

  errorMessage: string = "";
  showErrorMessage: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });


  login(){

    let loginObj = {
      Username : this.loginForm.value.username,
      Password : this.loginForm.value.password
    }

    this._authService.login(loginObj).subscribe({
      next : (res : any) => {
       // console.log(res.token);
       localStorage.setItem("token", res.token);
       localStorage.setItem("role", res.role);
       this.showErrorMessage = false;
       this._router.navigate(['/']);
      },
      error: err => {
       this.errorMessage = err.error?.message ?? err.error ?? "Login Excpetion";
       this.showErrorMessage = true;
       this._cdr.markForCheck();
      }
    })
  }

}