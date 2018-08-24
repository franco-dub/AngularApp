import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import {Room} from "../components/models/Room";
import {Module} from "../components/models/Module";
import {Course} from "../components/models/Course";
import {Professor} from "../components/models/Professor";
import {Student} from "../components/models/Student";
import {Secretary} from "../components/models/Secretary";
import {RoomEquipment} from "../components/models/RoomEquipment";
import {LectureCalendar} from "../components/models/LectureCalendar";
import {Ticket} from "../components/models/Ticket";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PostService {

  saveAulaUrl: string = "http://localhost:8080/SpringApp/room/add";

  saveAulaEquipmentsUrl: string = "http://localhost:8080/SpringApp/roomEquipment/add";

  saveModuleUrl: string = "http://localhost:8080/SpringApp/module/add";

  saveStudyCourseUrl: string = "http://localhost:8080/SpringApp/course/add";

  saveProfessorUrl: string = "http://localhost:8080/SpringApp/professor/add";

  saveSecretaryUrl: string = "http://localhost:8080/SpringApp/secretary/add";

  saveStudentUrl: string = "http://localhost:8080/SpringApp/student/add";

  addNewDayLectureUrl: string = "http://localhost:8080/SpringApp/lectureCalendar/add";

  sendTicketUrl: string = "http://localhost:8080/SpringApp/ticket/";


  constructor(private http: HttpClient) { }

  saveNewAula(aula: Room): Observable<Room>{
    return this.http.post<Room>(this.saveAulaUrl, aula, httpOptions);
  }

  saveAulaEquipments(equipments: Array<RoomEquipment>): Observable<Array<RoomEquipment>>{
    return this.http.post<Array<RoomEquipment>>(this.saveAulaEquipmentsUrl, equipments, httpOptions);
  }

  saveModule(teaching: Module): Observable<Module>{
    return this.http.post<Module>(this.saveModuleUrl, teaching, httpOptions);
  }

  saveCourse(studyCourse: Course): Observable<Course>{
    return this.http.post<Course>(this.saveStudyCourseUrl, studyCourse, httpOptions);
  }

  saveProfessor(user: Professor): Observable<Professor>{
    return this.http.post<Professor>(this.saveProfessorUrl, user, httpOptions);
  }

  saveStudent(user: Student): Observable<Student>{
    return this.http.post<Student>(this.saveStudentUrl, user, httpOptions);
  }

  saveSecretary(user: Secretary): Observable<Secretary> {
    return this.http.post<Secretary>(this.saveSecretaryUrl, user, httpOptions);
  }

  addNewDayLecture(lectureCalendar: LectureCalendar): Observable<LectureCalendar>{
    return this.http.post<LectureCalendar>(this.addNewDayLectureUrl, lectureCalendar, httpOptions);
  }

  sendTicket(ticket: Ticket): Observable<Ticket>{
    return this.http.put<Ticket>(this.sendTicketUrl + ticket.ticketId, ticket, httpOptions);
  }

}
