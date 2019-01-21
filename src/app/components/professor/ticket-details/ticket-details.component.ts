import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ticket } from '../../models/Ticket';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnChanges {

  @Input() ticket: Ticket;
  ticketDetails: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.ticket){
      this.ticketDetails = this.formBuilder.group({
        title: changes.ticket.currentValue.title,
        room: changes.ticket.currentValue.room,
        description: changes.ticket.currentValue.description
      });
    }
  }

}
