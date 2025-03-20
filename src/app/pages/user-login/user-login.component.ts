import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { IloginData } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  loginForm!: FormGroup
  errorMessage: string | null = null;



  constructor(private _fb: FormBuilder, private _userService: UserService, private _router: Router) {

    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })


  }


  onLoginSubmit() {
    if (this.loginForm.valid) {
      console.log("Login form submitted", this.loginForm.value)

      const loginData: IloginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

      this._userService.loginUser(loginData).subscribe((res: any) => {
        console.log("response after login", res)

        if (res.success) {
          console.log("Login successfully", res)
          localStorage.setItem('userToken', res.token)
          this._router.navigate(['/course'])
        }

      },
        (error) => {

          this.errorMessage = error.error.message || 'An error occurred. Please try again.';
        }

      )
    }
  }
}
