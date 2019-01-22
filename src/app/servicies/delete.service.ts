import { Injectable } from '@angular/core';
import {Ticket} from "../components/models/Ticket";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DeleteService {

  deleteTicketUrl: string = "http://localhost:8080/SpringApp/ticket/";

  constructor(private http: HttpClient) { }

  deleteTicket(ticket: Ticket): Observable<Ticket>{
    return this.http.delete<Ticket>(this.deleteTicketUrl + ticket.ticketId, httpOptions);
  }
}
