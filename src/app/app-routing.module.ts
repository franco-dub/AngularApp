import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SegHomeComponent} from './components/secretary/seg-home/seg-home.component';
import {AddAulaComponent} from './components/secretary/create/add-aula/add-aula.component';
import {AddUserComponent} from './components/secretary/create/add-user/add-user.component';
import {AddTeachingComponent} from './components/secretary/create/add-teaching/add-teaching.component';
import {AddStudyCourseComponent} from './components/secretary/create/add-study-course/add-study-course.component';
import {AddCalendarComponent} from './components/secretary/create/add-calendar/add-calendar.component';
import { AuthGuardService as AuthGuard } from './servicies/auth-guard.service';
import {ModifyAulaComponent} from './components/secretary/modify/modify-aula/modify-aula.component';
import {ModifyUserComponent} from './components/secretary/modify/modify-user/modify-user.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'seg-home', component: SegHomeComponent, canActivate: [AuthGuard]},
  {path: 'add-aula', component: AddAulaComponent},
  {path: 'add-user', component: AddUserComponent},
  {path: 'add-teaching', component: AddTeachingComponent},
  {path: 'add-course', component: AddStudyCourseComponent},
  {path: 'add-calendar', component: AddCalendarComponent},
  {path: 'modify-aula', component: ModifyAulaComponent},
  {path: 'modify-user', component: ModifyUserComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }
