import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute } from "@angular/router";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {
  questionAnswerData:any[] = []
  userData:any[] = []
  categoryData:any[] = []
  totalCountUser:any
  totalCountQuestionAnswer:any
  totalCountCategory:any

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private UserService:UserService, private router: Router) { }

  ngOnInit(): void {
    console.log("dfkjhdsjhfjhdjhfbhjbfjbdjfbdjbfbdhfbvdhvhdvhv>>>>>>>>>>>>")
    this.userListing()
    this.questionAnswerListing()
    this.categoryListing()
  }

  userListing(){
    this.UserService.usersListing().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      console.log(response.data, "response>>>>>>>>>>>>>>>>>>")
      this.userData = response.data
      this.totalCountUser = this.userData.length; 
       });
  } 
  questionAnswerListing(){
    this.UserService.questionAnswerListing().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      console.log(response.data, "response>>>>>>>>>>>>>>>>>>")
      this.questionAnswerData = response.data
      this.totalCountQuestionAnswer = this.questionAnswerData.length; 
       });
  } 
  categoryListing(){
      this.UserService.categoryListing().pipe(takeUntil(this.destroy$)).subscribe(response => {
      console.log(response.data, "response>>>>>>>>>>>>>>>>>>")
      this.categoryData = response.data
      this.totalCountCategory = this.categoryData.length; 
       });
  } 
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }


}
