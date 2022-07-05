import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule  } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {MatButtonModule} from '@angular/material/button';
//import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatTableModule} from '@angular/material/table';
// import {MatPaginatorModule} from '@angular/material/paginator';
// import {MatInputModule} from '@angular/material/input';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {MatSortModule} from '@angular/material/sort';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './services/user.service';
import {AuthGuard} from "./auth/auth.guard"
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { UsersComponent } from './component/users/users.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { CategoryComponent } from './component/category/category.component';
import { QuestionAnswerComponent } from './component/question-answer/question-answer.component';
import { DasboardComponent } from './component/dasboard/dasboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { NavbarLayoutComponent } from './layout/navbar-layout/navbar-layout.component';
import { LogoutComponent } from './auth/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    ResetPasswordComponent,
    CategoryComponent,
    QuestionAnswerComponent,
    DasboardComponent,
    NavbarComponent,
    LoginLayoutComponent,
    NavbarLayoutComponent,
    LogoutComponent,
    
   

  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    RouterModule,
    //MatButtonModule
    //MatCheckboxModule
    // MatInputModule, 
    // MatPaginatorModule,
    // MatProgressSpinnerModule,
    // MatSortModule,
    // MatTableModule,
    // MatFormFieldModule
  ],

  exports: [
    NavbarComponent,
  ],
  providers: [
    AuthGuard,UserService,
],
  bootstrap: [AppComponent]
})
export class AppModule {}
