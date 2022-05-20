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

  constructor(private http: HttpClient, private router:Router) { }

  // getUsers(){   
  //   return this.http.get(environment.API_ENDPOINT+'/api/users')
  // }
  login(data:any){   
    return this.http.get(environment.API_ENDPOINT+'/api/login' + data)
  }

}
