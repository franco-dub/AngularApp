import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import {Aula} from "../components/models/Aula";
import {Teaching} from "../components/models/Teaching";
import {StudyCourse} from "../components/models/StudyCourse";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PostService {

  saveAulaUrl: string = "http://localhost:8080/SEAppBackend/aula/save";
  saveTeachingUrl: string = "http://localhost:8080/SEAppBackend/teaching/save";
  saveStudyCourseUrl: string = "http://localhost:8080/SEAppBackend/studyCourse/saveCourse";
  getAulasUrl: string = "http://localhost:8080/SEAppBackend/aula/getFreeAula";


  constructor(private http: HttpClient) { }

  saveNewAula(aula: Aula): Observable<Aula>{
        return this.http.post<Aula>(this.saveAulaUrl, aula, httpOptions);
  }

  saveTeaching(teaching: Teaching): Observable<Teaching>{
    return this.http.post<Teaching>(this.saveTeachingUrl, teaching, httpOptions);
  }

  saveStudyCourse(studyCourse: StudyCourse): Observable<StudyCourse>{
    console.log(studyCourse.typeStudyCourse.id);
    return this.http.post<StudyCourse>(this.saveStudyCourseUrl, studyCourse, httpOptions);
  }

  getAulas(): Observable<Aula[]>{
    return this.http.get<Aula[]>(this.getAulasUrl);
  }

}
