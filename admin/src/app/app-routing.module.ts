import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { LoginComponent } from './component/login/login.component';
import {UsersComponent} from './component/users/users.component';
import {CategoryComponent} from './component/category/category.component'
import {QuestionAnswerComponent} from './component/question-answer/question-answer.component'
import {DasboardComponent} from './component/dasboard/dasboard.component'
import {LoginComponent} from './auth/login/login.component'
import {LoginLayoutComponent} from './layout/login-layout/login-layout.component'
import {NavbarLayoutComponent} from './layout/navbar-layout/navbar-layout.component'
import {NavbarComponent} from './navbar/navbar.component'
import { LogoutComponent } from './auth/logout/logout.component';

import {AuthGuard} from "./auth/auth.guard"
//import {AppComponent} from './app.component'

const routes: Routes = [
  { 
    path: '', 
    component:LoginLayoutComponent,
    children:[{
    path: 'login', 
    component: LoginComponent,
  }]
  }, 

  { 
    path: '', 
    children:[{
    path: 'logout', 
    component: LogoutComponent,
  }]
  }, 
  
  { 
    path: '', 
    component:NavbarComponent,
    canActivate: [AuthGuard],
    children:[{
      path: 'dashboard', 
      component: DasboardComponent,
    }]
  }, 
  { 
    path: '', 
    component:NavbarComponent,
    canActivate: [AuthGuard],
    children:[{
      path: 'userlisting', 
      component: UsersComponent,
    }]
  }, 

  { 
    path: '', 
    component:NavbarComponent,
    canActivate: [AuthGuard],
    children:[{
      path: 'categorylisting', 
      component: CategoryComponent,
    }]
  }, 


  { 
    path: '', 
    component:NavbarComponent,
    canActivate: [AuthGuard],
    children:[{
      path: 'questionanswerlisting', 
      component: QuestionAnswerComponent,
    }]
  }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
