export interface IUser{
    name:string;
    email:string;
    password:string;
    profileImage?:string
    latitude: number,
    longitude: number,
    cityname?: string
}


export interface IloginData{
   
    email:string;
    password:string;

}