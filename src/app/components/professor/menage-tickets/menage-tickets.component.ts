import { Component, OnInit } from '@angular/core';
import { GetService } from '../../../servicies/get.service';
import { Ticket } from '../../models/Ticket';
import { AuthService } from '../../../servicies/auth.service';
import { Room } from '../../models/Room';
import {RoutingService} from '../../../servicies/routing.service';

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

  constructor(private getService: GetService,
              private router: RoutingService,
              private authService: AuthService) {
    this.profId = this.authService.getLoggedUser('user').professorId;
  }

  ngOnInit() {
    this.router.currentLocation('menage-tickets');
    if(this.authService.isLoggednIn()) {
      this.getService.findByProfId(this.profId).subscribe(tickets => {
        this.tickets = tickets;
        this.tickets.sort();
      });
      this.getService.findAllRoom().subscribe(rooms => {
        this.rooms = rooms;
      });
    }else{
      this.router.navigate('');
    }
  }

  ticketDetails = false;
  loadDetails(ticket: Ticket) {
    this.selectedTicket = ticket;
    this.ticketDetails = true;
  }

  roomTickets(room: Room) {
    this.getService.findAllTicket().subscribe(tickets => {
      this.roomTicketsList = tickets;
      this.roomTicketsList.sort();
      this.roomTicketsList = this.roomTicketsList.filter(
        ticket => ticket.room.roomId === room.roomId);
    });
  }

  navigate(url: string){
    this.router.navigate(url);
  }
}
