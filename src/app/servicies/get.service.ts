import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Login} from "../components/models/Login";
import {Equipments} from "../components/models/Equipments";
import {Calendar} from "../components/models/Calendar";
import {Room} from "../components/models/Room";
import {Course} from "../components/models/Course";
import {Module} from "../components/models/Module";
import {Professor} from "../components/models/Professor";


@Injectable()
export class GetService {

  loginUrl: string = "http://localhost:8080/SpringApp/login/"; // /{email}/{passwd}

  findAllCoursesUrl: string = "http://localhost:8080/SpringApp/course/findAll";

  findAllTeachingByCourseUrl: string = "http://localhost:8080/SpringApp/module/findAll";

  findAllTeachingUrl: string = "http://localhost:8080/SpringApp/module/findAll";

  findAllProfessorUrl: string = "http://localhost:8080/SpringApp/professor/findAll";

  equipmentList: string = "http://localhost:8080/SpringApp/equipment/findAll";

  studyCourseType: string = "http://localhost:8080/SEAppBackend/typestudycourse/getall";

  getTeachingsUrl: string = "http://localhost:8080/SEAppBackend/teaching/getAll";

  getTeachingByIdStudyCourse: string = "http://localhost:8080/SEAppBackend/teaching/getByIdCourse/";

  getAllStudyCourseUrl: string = "http://localhost:8080/SEAppBackend/studyCourse/getAll";

  getCalendarByCourseUrl: string = "http://localhost:8080/SEAppBackend/calendar/getByCourse";

  getAulasUrl: string = "http://localhost:8080/SEAppBackend/aula/getFreeAula";


  constructor(private http: HttpClient) { }

  login(user: Login): Observable<any>{
    return this.http.get<any>(this.loginUrl + user.email + "/" + user.password );
  }

  findAllCourses(): Observable<Array<Course>>{
    return this.http.get<Array<Course>>(this.findAllCoursesUrl);
  }

  findAllModulesByCourse(course: Course): Observable<Array<Module>>{
    console.log(course.courseId);
    return this.http.get<Array<Module>>(this.findAllTeachingByCourseUrl + "/" + course.courseId);
  }

  findAllModule(): Observable<any>{
    return this.http.get<any>(this.findAllTeachingUrl);
  }

  findAllProfessor(): Observable<Array<Professor>>{
    return this.http.get<Array<Professor>>(this.findAllProfessorUrl);
  }

  getEquipmentData(): Observable<Equipments[]>{
    return this.http.get<Equipments[]>(this.equipmentList);
  }

  getTeachingsById(id:number): Observable<Module[]>{
    return this.http.get<Module[]>(this.getTeachingByIdStudyCourse + id);
  }

  getStudyCourseList(): Observable<Course[]>{
    return this.http.get<Course[]>(this.getAllStudyCourseUrl);
  }

  getCalendarByCourse(): Observable<Calendar>{
    return this.http.get<Calendar>(this.getCalendarByCourseUrl);
  }

  getAulas(): Observable<Room[]>{
    return this.http.get<Room[]>(this.getAulasUrl);
  }

}
