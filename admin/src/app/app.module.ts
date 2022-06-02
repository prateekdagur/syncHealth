import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
// import {MatTableModule} from '@angular/material/table';
// import {MatPaginatorModule} from '@angular/material/paginator';
// import {MatInputModule} from '@angular/material/input';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {MatSortModule} from '@angular/material/sort';
// import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { UsersComponent } from './component/users/users.component';
import { LoginComponent } from './component/login/login.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HeaderComponent } from './component/header/header.component';
import { CategoryComponent } from './component/category/category.component';
import { QuestionAnswerComponent } from './component/question-answer/question-answer.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    ResetPasswordComponent,
    HeaderComponent,
    CategoryComponent,
    QuestionAnswerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    // MatInputModule, 
    // MatPaginatorModule,
    // MatProgressSpinnerModule,
    // MatSortModule,
    // MatTableModule,
    // MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
