import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { GetService } from "./servicies/get.service";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SegHomeComponent } from './components/secretary/seg-home/seg-home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {AppRoutingModule} from "./app-routing.module";
import {PostService} from "./servicies/post.service";
import { AddAulaComponent } from './components/secretary/add-aula/add-aula.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProvaComponent } from './components/prova/prova.component';
import { AddUserComponent } from './components/secretary/add-user/add-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule, MatGridListModule, MatCheckboxModule, MatTableModule
} from "@angular/material";
import { AddTeachingComponent } from './components/secretary/add-teaching/add-teaching.component';
import { AddStudyCourseComponent } from './components/secretary/add-study-course/add-study-course.component';
import { AddCalendarComponent } from './components/secretary/add-calendar/add-calendar.component';
import {CdkTableModule} from "@angular/cdk/table";
import {RoleGuardService} from "./servicies/role-guard.service";
import {AuthGuardService} from "./servicies/auth-guard.service";
import {AuthService} from "./servicies/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    SegHomeComponent,
    NavbarComponent,
    AddAulaComponent,
    ProvaComponent,
    AddUserComponent,
    AddTeachingComponent,
    AddStudyCourseComponent,
    AddCalendarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatGridListModule,
    MatCheckboxModule,
    CdkTableModule,
    MatTableModule
  ],
  providers: [
    GetService,
    PostService,
    RoleGuardService,
    AuthGuardService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
