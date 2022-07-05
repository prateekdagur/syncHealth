import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from "@angular/router";
 import { Subject } from 'rxjs';
 import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService, private router:Router) { }

  ngOnInit() {
  this.logout()
  console.log("11111111111111")
  }
  logout(){
    this.userService.logout()
    if(!this.userService.getAdminToken()){
    this.router.navigate(['login']);
    Swal.fire("Logged Out")

    }
  }
}
