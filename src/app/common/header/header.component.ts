import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  defaultProfilePic: any = ''


  showProfileMenu = false;
  currentUser = {
    _id: 0,
    name: '',
    avatar: ''
  };

  constructor(private _userservice: UserService, private _router: Router) {

    this._userservice.getCurrentUserProfile().subscribe((res: any) => {
      console.log("user details", res)
      this.currentUser.name = res.data.name
      this.currentUser._id = res.data._id
      this.defaultProfilePic=res.data.profileImage

    })
  }


  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    Swal.fire({
      title: 'Are you sure want to Logout?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'No, stay logged in'
    }).then((result) => {

      if (result.isConfirmed) {
        localStorage.removeItem('userToken')
        this._router.navigate(['/login']);
        Swal.fire(
          'Logged Out!',
          'You have successfully logged out.',
          'success'
        )
      }
    })
  }
}
