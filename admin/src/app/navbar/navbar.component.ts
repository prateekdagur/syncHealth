import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  displayStyle = "none";
  isActive:any
  constructor(private router: Router) { }

  ngOnInit(): void {
    var newstr =  this.router.url.replace('/', "");  
    this.isActive = newstr;
  }
  
  // navigateCategory(){
  //   this.router.navigate(['/categorylisting'])
  // }

  // navigateQuestionAnswer(){
  //   this.router.navigate(['/questionanswerlisting'])
  // }

  // navigateDashboard(){
  //   this.router.navigate(['/dashboard'])
  // }
}
