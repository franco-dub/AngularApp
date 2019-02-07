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
import {ModifyTeachingComponent} from './components/secretary/modify/modify-teaching/modify-teaching.component';
import {ModifyCourseComponent} from './components/secretary/modify/modify-course/modify-course.component';
import {OpenTicketComponent} from './components/professor/open-ticket/open-ticket.component';
import { MenageTicketsComponent } from './components/professor/menage-tickets/menage-tickets.component';
import {ModifyCalendarComponent} from './components/secretary/modify/modify-calendar/modify-calendar.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'seg-home', component: SegHomeComponent, },
  {path: 'add-aula', component: AddAulaComponent, canActivate: [AuthGuard]},
  {path: 'add-user', component: AddUserComponent},
  {path: 'add-teaching', component: AddTeachingComponent},
  {path: 'add-course', component: AddStudyCourseComponent},
  {path: 'add-calendar', component: AddCalendarComponent},
  {path: 'modify-aula', component: ModifyAulaComponent},
  {path: 'modify-user', component: ModifyUserComponent},
  {path: 'modify-teaching', component: ModifyTeachingComponent},
  {path: 'modify-course', component: ModifyCourseComponent},
  {path: 'open-ticket', component: OpenTicketComponent},
  {path: 'menage-tickets', component: MenageTicketsComponent},
  {path: 'modify-calendar', component: ModifyCalendarComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }
