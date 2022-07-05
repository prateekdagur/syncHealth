import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
// import { takeUntil } from 'rxjs/operators';
 import { Subject } from 'rxjs';
 import Swal from 'sweetalert2/dist/sweetalert2.js';

//   import { UserService } from '../../services/user.service'
//  import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDetails = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
    displayStyle = "none";
    message = "";
  destroy$: Subject<boolean> = new Subject<boolean>();
  loginForm!: FormGroup;
  submitted:boolean = false
  constructor(private formBuilder: FormBuilder,private userService: UserService, private router:Router) {
  }

  ngOnInit() {
    if(this.userService.isAdminLoggedIn()){
  this.router.navigate(['dashboard']);
}

  this.loginDetails = this.formBuilder.group({
  email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  password: ['', Validators.required]
});

  }

  get getLogin() {
		return this.loginDetails.controls;
	}

	submit(){
		let params:any = {		
			'email':this.loginDetails.value.email,			
			'password':this.loginDetails.value.password
		}
		this.userService.login(params).subscribe(
			(res:any) =>{
        if(res.is_error === false){
        		this.userService.setAdminToken(res.data[0].accesstoken);
				    this.userService.setAdminEmail(res.data[0].email)
    
        if(this.userService.getAdminToken()){
          this.displayStyle = "block";
          this.message = "Admin Logged in Successfully";
          Swal.fire(this.message);	
          this.router.navigateByUrl('dashboard');
          } else {
            this.router.navigateByUrl('login');
          }  
        }	else {
          Swal.fire(res.message)
         }	
			},
			(err:any)=>{
				this.displayStyle = "block";
				this.message = err.error.message;
				Swal.fire(this.message);	
			}
		);
		
	}

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
