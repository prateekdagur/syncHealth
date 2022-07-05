import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private https: HttpClient, private router:Router) { }

  // getUsers(){   
  //   return this.http.get(environment.API_ENDPOINT+'/api/users')
  // }
  deleteAdminToken(){
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('email')
  }
  isAdminLoggedIn(){
    var AdminPayload = this.getAdminPayload();
    console.log(AdminPayload, "admin payload")
	  if(AdminPayload){
      return AdminPayload.exp > Date.now()/1000;
    }else{
      return false;
    }
  }
  getAdminPayload(){
	  var token = this.getAdminToken();
	  if(token){
      console.log
		  var AdminPayload = atob(token.split('.')[1]);
		  return JSON.parse(AdminPayload);
	  }else{
		  return token;
	  }
  }
 getAdminToken(){
    return localStorage.getItem('accesstoken');
  }
  setAdminToken(accesstoken:string){
  	localStorage.setItem('accesstoken', accesstoken);
  }
  setAdminEmail(email:string){
  	localStorage.setItem('email', email);
  }
  logout(){
    this.deleteAdminToken()
  }
  login(admin:any){
  	return this.https.post(environment.API_ENDPOINT+'/api/admin/auth/login',admin)
  }
  usersListing(): Observable<any>{   
    return this.https.get(environment.API_ENDPOINT+'/api/admin/user/listing')
  }
  updateUserIsActive(id:any, eventString:any){
    return this.https.put(environment.API_ENDPOINT+'/api/admin/user/update/'+ id, {eventString})
  }
  updateCategoryIsActive(id:any, eventString:any){
    console.log(id, eventString, "eeeeeee")
    return this.https.put(environment.API_ENDPOINT+'/api/admin/category/update/'+ id, {eventString})
  }
  categoryListing(): Observable<any>{
    return this.https.get(environment.API_ENDPOINT+'/api/admin/category/listing')
  }
  questionAnswerListing(): Observable<any>{
    return this.https.get(environment.API_ENDPOINT+'/api/admin/questionAnswer/listing')
  }
}
