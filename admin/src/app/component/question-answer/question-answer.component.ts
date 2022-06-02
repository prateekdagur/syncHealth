import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute } from "@angular/router";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private UserService:UserService, private router: Router) { }
 
  ngOnInit(): void {
    this.questionAnswerListing()
       }

       questionAnswerListing(){
        this.UserService.questionAnswerListing().pipe(takeUntil(this.destroy$)).subscribe((response) => {
          console.log(response, "response>>>>>>>>>>>>>>>>>>")
           });
      } 
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
