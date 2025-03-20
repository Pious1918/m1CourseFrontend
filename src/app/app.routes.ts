import { Routes } from '@angular/router';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { AuthService } from './services/auth.service';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LandingguardService } from './services/landingguard.service';

export const routes: Routes = [
    {path:'' ,component:LandingComponent , canActivate:[LandingguardService]},
    {path:'profile' , component:UserHomeComponent , canActivate:[AuthService]},
    {path:'register' , component:UserRegisterComponent},
    {path : 'login' , component:UserLoginComponent},
    {path:'course' , component:CourseDetailsComponent , canActivate:[AuthService]}
   


];
