import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SegHomeComponent} from "./components/secretary/seg-home/seg-home.component";
import {AddAulaComponent} from "./components/secretary/add-aula/add-aula.component";
import {ProvaComponent} from "./components/prova/prova.component";
import {AddUserComponent} from "./components/secretary/add-user/add-user.component";
import {AddTeachingComponent} from "./components/secretary/add-teaching/add-teaching.component";
import {AddStudyCourseComponent} from "./components/secretary/add-study-course/add-study-course.component";
import {AddCalendarComponent} from "./components/secretary/add-calendar/add-calendar.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'seg-home', component: SegHomeComponent},
  {path: 'add-aula', component: AddAulaComponent},
  {path: 'prova', component: ProvaComponent},
  {path: 'add-user', component: AddUserComponent},
  {path: 'add-teaching', component: AddTeachingComponent},
  {path: 'add-course', component: AddStudyCourseComponent},
  {path: 'add-calendar', component: AddCalendarComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }
