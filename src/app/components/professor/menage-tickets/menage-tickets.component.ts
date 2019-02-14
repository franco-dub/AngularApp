import { Component, OnInit } from '@angular/core';
import { GetService } from '../../../servicies/get.service';
import { Ticket } from '../../models/Ticket';
import { AuthService } from '../../../servicies/auth.service';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import { Room } from '../../models/Room';

@Component({
  selector: 'app-menage-tickets',
  templateUrl: './menage-tickets.component.html',
  styleUrls: ['./menage-tickets.component.css']
})
export class MenageTicketsComponent implements OnInit {

  tickets: Array<Ticket> = [];
  roomTicketsList: Array<Ticket> = [];
  profId: number;
  selectedTicket: Ticket;
  rooms: Array<Room> = [];
  selectedRoom: Room;
  ticketDetails = false;

  constructor(private getService: GetService,
    private authService: AuthService) {
    this.profId = this.authService.getLoggedUser('user').professorId;
  }

  ngOnInit() {
    this.getService.findByProfId(this.profId).subscribe(tickets => {
      this.tickets = tickets;
      if (tickets != null) {
        this.tickets.sort((val1, val2) => new Date(val2.date).valueOf() - new Date(val1.date).valueOf());
      }
    });
    this.getService.findAllRoom().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  loadDetails(ticket: Ticket) {
    this.selectedTicket = ticket;
    this.ticketDetails = true;
  }

  roomTickets(room: Room) {
    this.getService.findAllTicket().subscribe(tickets => {
      this.roomTicketsList = tickets;
      if (tickets != null) {
        this.roomTicketsList.sort((val1, val2) => new Date(val2.date).valueOf() - new Date(val1.date).valueOf());
        this.roomTicketsList = this.roomTicketsList.filter(
          ticket => ticket.room.roomId === room.roomId);
      }
    });
  }

}
