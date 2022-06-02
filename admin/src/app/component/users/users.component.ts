import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute } from "@angular/router";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private UserService:UserService, private router: Router) { }

  ngOnInit(): void {
    this.userListing()
       }

      userListing(){
        this.UserService.usersListing().pipe(takeUntil(this.destroy$)).subscribe((response) => {
          console.log(response, "response>>>>>>>>>>>>>>>>>>")
           });
      } 
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
