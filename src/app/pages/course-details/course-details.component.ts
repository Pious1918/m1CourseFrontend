import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LatLng, computeDistanceBetween } from 'spherical-geometry-js'; // Google Maps library

interface School {
  id: number;
  name: string;
  board: string;
  address:string;
  distance: number;
  location: string;
  subject:any
  rating: number;
}
@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [HeaderComponent , CommonModule , FormsModule ,ReactiveFormsModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit{

  profileData: any = {};
  userLatitude!:number
  userLongitude!:number
  searchForm: FormGroup;
  boardOptions: string[] = ['CBSE', 'ICSE', 'State'];
  schools: any[] = [];
  filteredSchools: School[] = [];

  selectedboard!:string
  selectedmile!:number
  unschool:any[]=[]

  constructor(private fb: FormBuilder , private _userservice:UserService) {
    this.searchForm = this.fb.group({
      board: ['', Validators.required],
      miles: [10, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  ngOnInit(): void {

    this.getuserdetails()
    this.filteredSchools = [...this.schools];
  }

  onSearch(): void {
    if (this.searchForm.valid) {
    
      this.getNearCourses()
    }
  }

  resetFilters(): void {
    this.searchForm.reset({
      board: '',
      miles: 10
    });
    this.getNearCourses()
  
  }

  getuserdetails(){
    this._userservice.getCurrentUserProfile().subscribe((res:any)=>{
      console.log("userdetails @ coursedetails",res)
      this.userLatitude=res.data.latitude
      this.userLongitude=res.data.longitude
      console.log(`@coursedetails latitude:${this.userLatitude} , longitude:${this.userLongitude}`)
      this.profileData=res.data

      this.getNearCourses()
    })
  }

  getNearCourses() {
    const board = this.searchForm.get('board')?.value;
    const miles = this.searchForm.get('miles')?.value;

    this._userservice.getCourses(board, miles).subscribe((res: any) => {
      console.log(res)

      this.schools = res.map((school: any) => {
        const schoolLocation = new LatLng(school.location.coordinates[1], school.location.coordinates[0]);
        const userLocation = new LatLng(this.userLatitude, this.userLongitude);
        const distanceMeters = computeDistanceBetween(userLocation, schoolLocation);
        const distanceMiles = distanceMeters * 0.000621371; // Converting meters to miles

        return { ...school, distance: distanceMiles.toFixed(2) };
      });

      this.filteredSchools = this.schools.filter(school => school.distance <= miles);
    });
  }






  
}
