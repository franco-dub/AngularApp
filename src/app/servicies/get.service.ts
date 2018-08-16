import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Person} from "../components/models/Person";
import {Login} from "../components/models/Login";

import {Equipments} from "../components/models/Equipments";
import {StudyCourseType} from "../components/models/StudyCourseType";
import {Teaching} from "../components/models/Teaching";
import {StudyCourse} from "../components/models/StudyCourse";
import {Calendar} from "../components/models/Calendar";
import {Room} from "../components/models/Room";
import {returned} from "../components/models/Returned";


@Injectable()
export class GetService {

  loginUrl: string = "http://localhost:8080/SpringApp/user/login/"; // /{email}/{passwd}

  equipmentList: string = "http://localhost:8080/SEAppBackend/equipment/getAll";

  studyCourseType: string = "http://localhost:8080/SEAppBackend/typestudycourse/getall";

  getTeachingsUrl: string = "http://localhost:8080/SEAppBackend/teaching/getAll";

  getTeachingByIdStudyCourse: string = "http://localhost:8080/SEAppBackend/teaching/getByIdCourse/";

  getAllStudyCourseUrl: string = "http://localhost:8080/SEAppBackend/studyCourse/getAll";

  getCalendarByCourseUrl: string = "http://localhost:8080/SEAppBackend/calendar/getByCourse";

  getAulasUrl: string = "http://localhost:8080/SEAppBackend/aula/getFreeAula";

  constructor(private http: HttpClient) { }

  login(user: Login): Observable<returned>{
    return this.http.get<returned>(this.loginUrl + user.email + "/" + user.password );
  }

  getEquipmentData(): Observable<Equipments[]>{
    return this.http.get<Equipments[]>(this.equipmentList);
  }

  getStudyCourseTypeList(): Observable<StudyCourseType[]>{
    return this.http.get<StudyCourseType[]>(this.studyCourseType);
  }

  getTeachings(): Observable<Teaching[]>{
    return this.http.get<Teaching[]>(this.getTeachingsUrl);
  }

  getTeachingsById(id:number): Observable<Teaching[]>{
    return this.http.get<Teaching[]>(this.getTeachingByIdStudyCourse + id);
  }

  getStudyCourseList(): Observable<StudyCourse[]>{
    return this.http.get<StudyCourse[]>(this.getAllStudyCourseUrl);
  }

  getCalendarByCourse(): Observable<Calendar>{
    return this.http.get<Calendar>(this.getCalendarByCourseUrl);
  }

  getAulas(): Observable<Room[]>{
    return this.http.get<Room[]>(this.getAulasUrl);
  }

}
