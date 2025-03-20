import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IloginData, IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _api = 'http://localhost:3000'
  constructor(private _http:HttpClient) { }


  registerUser(userdata:IUser){
    return this._http.post(`${this._api}/register`,userdata)
  }


  loginUser(loginData: IloginData) {
    return this._http.post(`${this._api}/login`, { loginData })
  }

  getCurrentUserProfile() {
    return this._http.get(`${this._api}/userdetails`)
  }

  getCourses(board:string , miles: number) {

    const params = new HttpParams().set('board' , board).set('miles',miles.toString())

    return this._http.get(`${this._api}/courses` , { params })
  }

  saveProfileImageToDB(s3Url: string) {
    return this._http.put(`${this._api}/upateImage`, { s3Url })
  }

  updateUsername(name: string) {
    return this._http.put(`${this._api}/updatename`, { name })
  }

}
