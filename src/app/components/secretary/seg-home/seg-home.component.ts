import { Component, OnInit } from '@angular/core';
import {RoutingService} from '../../../servicies/routing.service';
import {GetService} from '../../../servicies/get.service';
import {Ticket} from '../../models/Ticket';
import {PostService} from '../../../servicies/post.service';
import {MatBottomSheet} from '@angular/material';
import {BottomSheetComponent} from '../../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-seg-home',
  templateUrl: './seg-home.component.html',
  styleUrls: ['./seg-home.component.css']
})
export class SegHomeComponent implements OnInit {

  tickets: Array<Ticket> = [];

  constructor(private router: RoutingService,
              private getService: GetService,
              private postService: PostService,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    if (this.router.getHistory()[this.router.getHistory().length - 1] !== 'seg-home') {
      this.router.loadUrl('seg-home');
    }
    this.refreshTicket();
  }

  addAula(): void {
    this.router.navigate('add-aula');
  }

  modifyAula() {
    this.router.navigate('modify-aula');
  }

  addUser(): void {
    this.router.navigate('add-user');
  }

  modifyUser() {

  }

  addTeaching(): void {
    this.router.navigate('add-teaching');
  }

  modifyTeaching() {

  }

  addStudyCourse(): void {
    this.router.navigate('add-course');
  }

  modifyStudyCourse() {

  }

  addCalendar(): void {
    this.router.navigate('add-calendar');
  }

  modifyCalendar() {

  }

  resume(ticket: Ticket) {
    ticket.status = 'ACCEPTED';
    this.bottomSheet.open(BottomSheetComponent, {data: [{type: 'RESUME'}, {ticket: ticket}]}).dismiss(result => {
      this.postService.sendTicket(result).subscribe(tickett => {
        if (tickett != null) {
          this.refreshTicket();
        }
      });
    });
  }

  delete(ticket: Ticket) {
    ticket.status = 'REJECTED';
    this.bottomSheet.open(BottomSheetComponent, {data: [{type: 'REJECTED'}, {ticket: ticket}]})
      .dismiss(result => {
        this.postService.sendTicket(result).subscribe(tickett => {
          if (tickett != null) {
            this.refreshTicket();
          }
        });
      }
    );
  }

  accept(ticket: Ticket) {
    ticket.status = 'ACCEPTED';
    this.postService.sendTicket(ticket).subscribe(tickett => {
      if (tickett != null) {
        this.refreshTicket();
      }
    });
  }

  refreshTicket() {
    this.getService.findAllTicket().subscribe(tickets => {
      this.tickets = tickets;
      this.tickets.sort();
    });
  }


}
