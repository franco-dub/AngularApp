import { Component, OnInit } from '@angular/core';
import { GetService } from '../../../servicies/get.service';
import { Ticket } from '../../models/Ticket';
import { AuthService } from '../../../servicies/auth.service';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';

@Component({
  selector: 'app-menage-tickets',
  templateUrl: './menage-tickets.component.html',
  styleUrls: ['./menage-tickets.component.css']
})
export class MenageTicketsComponent implements OnInit {

  tickets: Array<Ticket> = [];
  profId: number;
  selectedTicket: Ticket;
  
  constructor(private getService: GetService,
              private authService: AuthService) {
                this.profId = this.authService.getLoggedUser('user').professorId;
              }

  ngOnInit() {
    this.getService.findByProfId(this.profId).subscribe(tickets => {
      this.tickets = tickets;
      this.tickets.sort();
    });
  }

  private ticketDetails = false;
  loadDetails(ticket: Ticket){
    this.selectedTicket = ticket; 
    this.ticketDetails = true;
  }

}
