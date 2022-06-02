import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { LoginComponent } from './component/login/login.component';
import { UsersComponent} from './component/users/users.component';
import {HeaderComponent} from './component/header/header.component';
import {CategoryComponent} from './component/category/category.component'
import {QuestionAnswerComponent} from './component/question-answer/question-answer.component'

//import {AppComponent} from './app.component'

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: HeaderComponent,
  },
    {
      path: 'userlisting',
      component: UsersComponent
    },
    {
      path: 'categorylisting',
      component: CategoryComponent
    },{
      path: 'questionanswerlisting',
      component: QuestionAnswerComponent
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
