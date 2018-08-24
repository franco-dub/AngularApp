import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Room} from "../components/models/Room";
import {Observable} from "rxjs";
import {RoomEquipment} from "../components/models/RoomEquipment";
import {Student} from "../components/models/Student";
import {Secretary} from "../components/models/Secretary";
import {Professor} from "../components/models/Professor";
import {Ticket} from "../components/models/Ticket";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PutService {

  updateRoomUrl: string = "http://localhost:8080/SpringApp/room/updateById";

  updateRoomEquipmentUrl: string = "http://localhost:8080/SpringApp/roomEquipment/updateByRoom";

  updateStudentUrl: string = "http://localhost:8080/SpringApp/student/update";

  updateSecretaryUrl: string = "http://localhost:8080/SpringApp/secretary/update";

  updateProfessorUrl: string = "http://localhost:8080/SpringApp/professor/update";

  updateTicketUrl: string = "http://localhost:8080/SpringApp/ticket/";

  constructor(private http: HttpClient) { }

  updateRoom(room: Room): Observable<Room>{
    return this.http.post<Room>(this.updateRoomUrl + "/" + room.roomId, room, httpOptions);
  }

  updateRoomEquipment(roomEquipments: Array<RoomEquipment>): Observable<Array<RoomEquipment>>{
    return this.http.post<Array<RoomEquipment>>(this.updateRoomEquipmentUrl, roomEquipments, httpOptions);
  }

  updateStudent(student: Student): Observable<Student>{
    return this.http.post<Student>(this.updateStudentUrl, student, httpOptions);
  }

  updateSecretary(secretary: Secretary): Observable<Secretary>{
    return this.http.post<Secretary>(this.updateSecretaryUrl, secretary, httpOptions);
  }

  updateProfessor(professor: Professor): Observable<Professor>{
    return this.http.post<Professor>(this.updateProfessorUrl, professor, httpOptions);
  }

  updateTicket(ticket: Ticket): Observable<Ticket>{
    return this.http.put<Ticket>(this.updateTicketUrl + ticket.ticketId, ticket, httpOptions);
  }

}
