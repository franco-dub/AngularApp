import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Room} from '../components/models/Room';
import {Observable} from 'rxjs';
import {RoomEquipment} from '../components/models/RoomEquipment';
import {Student} from '../components/models/Student';
import {Secretary} from '../components/models/Secretary';
import {Professor} from '../components/models/Professor';
import {Ticket} from '../components/models/Ticket';
import {Module} from '../components/models/Module';
import {Course} from '../components/models/Course';
import {LectureCalendar} from '../components/models/LectureCalendar';


const  headers = new HttpHeaders()
  .append('Content-Type' , 'application/json');

@Injectable()
export class PutService {

  updateRoomUrl = 'http://localhost:8080/SpringApp/room/updateById';

  updateRoomEquipmentUrl = 'http://localhost:8080/SpringApp/roomEquipment/updateByRoom';

  updateRoomEquipmentUrl2 = 'http://localhost:8080/SpringApp/roomEquipment/updateById/';

  updateStudentUrl = 'http://localhost:8080/SpringApp/student/update';

  updateSecretaryUrl = 'http://localhost:8080/SpringApp/secretary/update';

  updateProfessorUrl = 'http://localhost:8080/SpringApp/professor/update';

  updateTicketUrl = 'http://localhost:8080/SpringApp/ticket/';

  updateModuleUrl = 'http://localhost:8080/SpringApp/module/';

  updateCourseUrl = 'http://localhost:8080/SpringApp/course/';

  updateDayLectureUrl = 'http://localhost:8080/SpringApp/calendar/';

  constructor(private http: HttpClient) { }

  updateRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.updateRoomUrl + '/' + room.roomId, room, {headers: headers});
  }

  updateRoomEquipment(roomEquipments: Array<RoomEquipment>): Observable<Array<RoomEquipment>> {
    return this.http.post<Array<RoomEquipment>>(this.updateRoomEquipmentUrl, roomEquipments, {headers: headers});
  }

  updateRoomEquipment2(roomEquipment: RoomEquipment): Observable<RoomEquipment> {
    return this.http.put<RoomEquipment>(this.updateRoomEquipmentUrl2 + roomEquipment.roomEquipmentId, roomEquipment, {headers: headers});
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.updateStudentUrl, student, {headers: headers});
  }

  updateSecretary(secretary: Secretary): Observable<Secretary> {
    return this.http.post<Secretary>(this.updateSecretaryUrl, secretary, {headers: headers});
  }

  updateProfessor(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.updateProfessorUrl, professor, {headers: headers});
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(this.updateTicketUrl + ticket.ticketId, ticket, {headers: headers});
  }

  updateModule(module: Module): Observable<Module> {
    return this.http.put<Module>(this.updateModuleUrl + module.moduleId, module, {headers: headers});
  }
  

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(this.updateCourseUrl + course.courseId, course, {headers: headers});
  }

  updateDayLecture(lesson: LectureCalendar): Observable<LectureCalendar>{
    console.log(lesson);
    return this.http.put<LectureCalendar>(this.updateDayLectureUrl + lesson.calendarId, lesson, {headers: headers});
  }
}
