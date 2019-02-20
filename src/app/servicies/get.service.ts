import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Login} from "../components/models/Login";
import {Room} from "../components/models/Room";
import {Course} from "../components/models/Course";
import {Module} from "../components/models/Module";
import {Professor} from "../components/models/Professor";
import {RoomEquipment} from "../components/models/RoomEquipment";
import {Equipments} from "../components/models/Equipments";
import {Student} from "../components/models/Student";
import {Secretary} from "../components/models/Secretary";
import {LectureCalendar} from "../components/models/LectureCalendar";
import {Ticket} from "../components/models/Ticket";
import { TeachingMaterial } from '../components/models/TeachingMaterial';
import { TmRating } from '../components/models/TmRating';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class GetService {

  loginUrl: string = "http://localhost:8080/SpringApp/login/"; // /{email}/{passwd}
  private findAllCoursesUrl: string = "http://localhost:8080/SpringApp/course/findAll";
  private findAllTeachingByCourseUrl: string = "http://localhost:8080/SpringApp/module/findAll";
  private findAllTeachingUrl: string = "http://localhost:8080/SpringApp/module/findAll";
  private findAllProfessorUrl: string = "http://localhost:8080/SpringApp/professor/findAll";
  private equipmentList: string = "http://localhost:8080/SpringApp/equipment/findAll";
  private findAllRoomUrl: string = "http://localhost:8080/SpringApp/room/findAll";
  private findEquipmentByRoomUrl: string = "http://localhost:8080/SpringApp/roomEquipment/findByRoomId";
  private findAllStudentUrl: string = "http://localhost:8080/SpringApp/student/findAll";
  private findAllSecretartUrl: string = "http://localhost:8080/SpringApp/secretary/findAll";
  private findAllFreeAulasUrl: string = "http://localhost:8080/SpringApp/scheduling/findFreeRooms";
  private findAllLectureCalendarUrl: string = "http://localhost:8080/SpringApp/calendar/findAll";
  private findAllTicketUrl: string = "http://localhost:8080/SpringApp/ticket/findAll";
  private findByProfIdUrl: string = "http://localhost:8080/SpringApp/ticket/findByProfId/";
  private findLessonByTeachingUrl: string = "http://localhost:8080/SpringApp/calendar/findByModuleId/";

  findFileByModuleUrl: string = "http://localhost:8080/SpringApp/teachingMaterial/findByModule/";
  findModuleByProfUrl: string = "http://localhost:8080/SpringApp/module/findByProf/";
  downloadFileUrl: string = 'http://localhost:8080/SpringApp/teachingMaterial/downloadFile/';
  findRatingByTMIdUrl: string = 'http://localhost:8080/SpringApp/tmRating/findByTmId/';


  constructor(private http: HttpClient) { }

  login(user: Login): Observable<any>{
    return this.http.get<any>(this.loginUrl + user.email + "/" + user.password );
  }

  findAllCourses(): Observable<Array<Course>>{
    return this.http.get<Array<Course>>(this.findAllCoursesUrl);
  }

  findAllModulesByCourse(course: Course): Observable<Array<Module>>{
    return this.http.get<Array<Module>>(this.findAllTeachingByCourseUrl + "/" + course.courseId);
  }

  findAllModule(): Observable<any>{
    return this.http.get<any>(this.findAllTeachingUrl);
  }

  findAllProfessor(): Observable<Array<Professor>>{
    return this.http.get<Array<Professor>>(this.findAllProfessorUrl);
  }

  findAllRoom(): Observable<Array<Room>>{
    return this.http.get<Array<Room>>(this.findAllRoomUrl);
  }

  findEquipmentByRoom(room: Room): Observable<Array<RoomEquipment>>{
    return this.http.get<Array<RoomEquipment>>(this.findEquipmentByRoomUrl + "/" + room.roomId);
  }

  findAllStudent(): Observable<Array<Student>>{
    return this.http.get<Array<Student>>(this.findAllStudentUrl);
  }

  findAllSecretary(): Observable<Array<Secretary>>{
    return this.http.get<Array<Secretary>>(this.findAllSecretartUrl);
  }

  getEquipmentData(): Observable<Equipments[]>{
    return this.http.get<Equipments[]>(this.equipmentList);
  }

  findAllFreeAulas(lectureCalendar: LectureCalendar): Observable<Array<Room>>{
    return this.http.post<Array<Room>>(this.findAllFreeAulasUrl, lectureCalendar, httpOptions);
  }

  findAllLectureCalendar(): Observable<Array<LectureCalendar>>{
    return this.http.get<Array<LectureCalendar>>(this.findAllLectureCalendarUrl);
  }

  findAllTicket(): Observable<Array<Ticket>>{
    return this.http.get<Array<Ticket>>(this.findAllTicketUrl);
  }

  findByProfId(id: number): Observable<Array<Ticket>>{
    return this.http.get<Array<Ticket>>(this.findByProfIdUrl + id);
  }

  findLessonByTeaching(teaching: Module): Observable<Array<LectureCalendar>>{
    return this.http.get<Array<LectureCalendar>>(this.findLessonByTeachingUrl + teaching.moduleId);
  }
  
  findFileByModule(moduleId: number): Observable<Array<TeachingMaterial>>{
    return this.http.get<Array<TeachingMaterial>>(this.findFileByModuleUrl + moduleId);
  }

  findModuleByProf(professorId: number): Observable<Array<Module>>{
    return this.http.get<Array<Module>>(this.findModuleByProfUrl + professorId);
  }

  downloadFile(fileId: number) {
    return this.downloadFileUrl + fileId;
  }

  findRatingByTMId(ratingId: number): Observable<Array<TmRating>> {
    return this.http.get<Array<TmRating>>(this.findRatingByTMIdUrl + ratingId);
  }
}
