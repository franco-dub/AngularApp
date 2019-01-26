import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { GetService } from './servicies/get.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SegHomeComponent } from './components/secretary/seg-home/seg-home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {AppRoutingModule} from './app-routing.module';
import {PostService} from './servicies/post.service';
import { AddAulaComponent } from './components/secretary/create/add-aula/add-aula.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddUserComponent } from './components/secretary/create/add-user/add-user.component';
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
  MatOptionModule,
  MatGridListModule,
  MatCheckboxModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatBottomSheetModule,
  MatDividerModule,
  MatTreeModule,
  MatDialogModule
} from '@angular/material';
import { AddTeachingComponent } from './components/secretary/create/add-teaching/add-teaching.component';
import { AddStudyCourseComponent } from './components/secretary/create/add-study-course/add-study-course.component';
import { AddCalendarComponent } from './components/secretary/create/add-calendar/add-calendar.component';
import {CdkTableModule} from '@angular/cdk/table';
import {AuthGuardService} from './servicies/auth-guard.service';
import {AuthService} from './servicies/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { ModifyAulaComponent } from './components/secretary/modify/modify-aula/modify-aula.component';
import {PutService} from './servicies/put.service';
import { ModifyUserComponent } from './components/secretary/modify/modify-user/modify-user.component';
import {DatePipe} from '@angular/common';
import {DlDateTimePickerDateModule} from 'angular-bootstrap-datetimepicker';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import {RoutingService} from './servicies/routing.service';
import { BottomSheetSecretaryComponent } from './components/secretary/bottom-sheet-secretary/bottom-sheet-secretary.component';
import { ModifyTeachingComponent } from './components/secretary/modify/modify-teaching/modify-teaching.component';
import { ModifyCourseComponent } from './components/secretary/modify/modify-course/modify-course.component';
import { OpenTicketComponent } from './components/professor/open-ticket/open-ticket.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { MenageTicketsComponent } from './components/professor/menage-tickets/menage-tickets.component';
import { TicketDetailsComponent } from './components/professor/ticket-details/ticket-details.component';
import { DeleteService } from './servicies/delete.service';
import { UploadFileComponent } from './components/professor/upload-file/upload-file.component';
import { FilesListComponent } from './components/professor/files-list/files-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    SegHomeComponent,
    NavbarComponent,
    AddAulaComponent,
    AddUserComponent,
    AddTeachingComponent,
    AddStudyCourseComponent,
    AddCalendarComponent,
    ModifyAulaComponent,
    ModifyUserComponent,
    BottomSheetComponent,
    BottomSheetSecretaryComponent,
    ModifyTeachingComponent,
    ModifyCourseComponent,
    OpenTicketComponent,
    MenageTicketsComponent,
    TicketDetailsComponent,
    UploadFileComponent,
    FilesListComponent,

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
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    DlDateTimePickerDateModule,
    MatBottomSheetModule,
    MatDividerModule,
    MatTreeModule,
    StorageServiceModule,
    MatDialogModule
  ],
  providers: [
    GetService,
    PostService,
    JwtHelperService,
    AuthGuardService,
    AuthService,
    PutService,
    DatePipe,
    RoutingService,
    DeleteService
  ],
  bootstrap: [AppComponent],

  entryComponents: [BottomSheetComponent]
})

export class AppModule { }
