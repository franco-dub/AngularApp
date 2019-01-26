import { Injectable } from '@angular/core';
import {Ticket} from "../components/models/Ticket";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeachingMaterial } from '../components/models/TeachingMaterial';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DeleteService {

  deleteTicketUrl: string = "http://localhost:8080/SpringApp/ticket/";
  deleteFileUrl: string = "http://localhost:8080/SpringApp/teachingMaterial/"

  constructor(private http: HttpClient) { }

  deleteTicket(ticket: Ticket): Observable<Ticket>{
    return this.http.delete<Ticket>(this.deleteTicketUrl + ticket.ticketId, httpOptions);
  }
  deleteFile(teachingMaterial: TeachingMaterial): Observable<TeachingMaterial>{
    return this.http.delete<TeachingMaterial>(this.deleteFileUrl + teachingMaterial.teachingMaterialId, httpOptions);
  }
}
