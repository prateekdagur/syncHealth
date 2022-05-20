import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router, ActivatedRoute } from "@angular/router";
// import { takeUntil } from 'rxjs/operators';
// import { Subject } from 'rxjs';

//   import { UserService } from '../../services/user.service'
//  import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // destroy$: Subject<boolean> = new Subject<boolean>();
  // loginForm!: FormGroup;
  // submitted:boolean = false
  // constructor(private UserService:UserService, private formBuilder: FormBuilder, private router: Router) {
  // }

  ngOnInit() {
    //setting the page title
   // this._initalizeLoginForm()
  }

  // private _initalizeLoginForm() {
  //   this.loginForm = this.formBuilder.group({
  //     email: ['', [Validators.email, Validators.required]],
  //     password: [null, [Validators.required]]     
  //   });
  // }
  // onSubmit() {
  //   if (this.loginForm.invalid) {
  //     this.submitted = true    
  //     return
  //   }

  // let data: any = {
  //    user_information_email_address:this.loginForm.value,
  //    user_information_password: this.loginForm.value
  // }
  // this.UserService.login(data).pipe(takeUntil(this.destroy$)).subscribe((response) => {
  //      console.log(response, "response")
  //       });
  // }
  
  // ngOnDestroy() {
  //   this.destroy$.next(true);
  //   // Unsubscribe from the subject
  //   this.destroy$.unsubscribe();
  // }

}
