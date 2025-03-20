import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {

  registerForm!: FormGroup
  latitude!: number
  longitude!: number
  cityname!: string
  errorMessage: string = '';

  constructor(private _userService: UserService, private http: HttpClient, private _fb: FormBuilder, private _router: Router) {


    this.registerForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)
      ]],
      latitude: [0],
      longitude: [0],
      cityname: ['']
    })


  }

  ngOnInit(): void {

    this.getuserLocation()
  }

  getuserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("geolcation", position)
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      this.getCityName(this.latitude, this.longitude);

    })
  }

  getCityName(latitude: number, longitude: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        const city = data.address.city || data.address.town || data.address.village || data.address.municipality || data.address.state_district || 'Unknown';
        console.log("City Name:", city);
        this.cityname = city
      },
      error: (error) => console.error("Error fetching city name:", error)
    });
  }


  onRegisterSubmit() {

    console.log("here reacher", this.registerForm.value)
    if (this.latitude === null || this.longitude === null) {
      alert("Location is required. Please allow location access.");
      return;
    }


    this.registerForm.patchValue({
      latitude: this.latitude,
      longitude: this.longitude,
      cityname: this.cityname
    });

    if (this.registerForm.valid) {

      const registerData: IUser = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        latitude: this.registerForm.value.latitude,
        longitude: this.registerForm.value.longitude,
        cityname: this.registerForm.value.cityname
      }
      this._userService.registerUser(registerData).subscribe({
        next: (res) => {
          console.log("registered successfully");
          this._router.navigate(['/login'])
          this.errorMessage = '';
        },
        error: (err: HttpErrorResponse) => {
          if (err.error && err.error.message) {

            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = "An error occurred. Please try again.";
          }
        }
      });

    } else {
      console.log("not valid ")
    }
  }
}
