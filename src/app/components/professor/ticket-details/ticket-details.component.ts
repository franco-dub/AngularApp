import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ticket } from '../../models/Ticket';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PutService } from '../../../servicies/put.service';
import { RoutingService } from '../../../servicies/routing.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnChanges {

  @Input() ticket: Ticket;
  ticketDetails: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private putService: PutService,
              private router: RoutingService) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.ticket){
      console.log(changes.ticket)
      this.ticketDetails = this.formBuilder.group({
        title: changes.ticket.currentValue.title,
        room: changes.ticket.currentValue.room,
        description: changes.ticket.currentValue.description,
        status: changes.ticket.currentValue.status,
        date: changes.ticket.currentValue.date,
        lastModified: changes.ticket.currentValue.lastModified
      });
      this.ticketDetails.valueChanges.subscribe( form => {
        this.ticket.title = form.title,
        this.ticket.description = form.description
      })
    }
  }

  onSubmitForm(){
    console.log(this.ticket)
    this.putService.updateTicket(this.ticket).subscribe(ticket => {
      if (ticket != null)
        this.router.navigate('seg-home');
    });
  }

}
