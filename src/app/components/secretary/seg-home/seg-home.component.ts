import { Component, OnInit } from '@angular/core';
import {RoutingService} from '../../../servicies/routing.service';
import {GetService} from '../../../servicies/get.service';
import {Ticket} from '../../models/Ticket';
import {PostService} from '../../../servicies/post.service';
import {MatBottomSheet} from '@angular/material';
import {AuthService} from '../../../servicies/auth.service';
import {BottomSheetSecretaryComponent} from '../bottom-sheet-secretary/bottom-sheet-secretary.component';
import {PutService} from '../../../servicies/put.service';

@Component({
  selector: 'app-seg-home',
  templateUrl: './seg-home.component.html',
  styleUrls: ['./seg-home.component.css']
})
export class SegHomeComponent implements OnInit {

  tickets: Array<Ticket> = [];
  closed: Array<Ticket> = [];
  opened: Array<Ticket> = [];

  SUser: boolean = false;
  SAula: boolean = false;
  SCalendar: boolean = false;
  STeaching: boolean = false;
  SCourse: boolean = false;


  constructor(private router: RoutingService,
              private getService: GetService,
              private postService: PostService,
              private bottomSheet: MatBottomSheet,
              private authService: AuthService,
              private putService: PutService) {}

  ngOnInit() {
    this.router.currentLocation('seg-home');
    if(this.authService.isLoggednIn()) {
      this.refresh();
    }
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
    this.router.navigate('modify-user');
  }

  addTeaching(): void {
    this.router.navigate('add-teaching');
  }

  modifyTeaching() {
    this.router.navigate('modify-teaching');
  }

  addStudyCourse(): void {
    this.router.navigate('add-course');
  }

  modifyStudyCourse() {
    this.router.navigate('modify-course');
  }

  addCalendar(): void {
    this.router.navigate('add-calendar');
  }

  modifyCalendar(){
    this.router.navigate("modify-calendar");
  }

  resume(ticket: Ticket){
//    ticket.status = 'ACCEPTED';
    const bottomsheet = this.bottomSheet.open(BottomSheetSecretaryComponent, {data: [{type: 'RESUME'}, {ticket: ticket}]});
    bottomsheet.afterDismissed().subscribe(()=>{
      this.refresh();
    });
  }

  delete(ticket: Ticket){
    const bottomsheet = this.bottomSheet.open(BottomSheetSecretaryComponent,{data: [{type: 'REJECTED'}, {ticket: ticket}]});
    bottomsheet.afterDismissed().subscribe(()=>{
      this.refresh();

    });
  }

  accept(ticket: Ticket) {
    ticket.status = 'ACCEPTED';
    this.putService.updateTicket(ticket).subscribe(ticket => {
      if (ticket != null){
        this.refresh();
      }
    });
  }

  refresh(){
    this.tickets = [];
    this.opened = [];
    this.closed = [];

    this.getService.findAllTicket().subscribe(ticket => {
      this.tickets = ticket;
      this.tickets.sort();
      this.tickets.forEach(ticket => {
        if (ticket.status == "REJECTED") {
          this.closed.push(ticket);
        } else if (ticket.status == "SOLVED") {
          this.closed.push(ticket);
        } else {
          this.opened.push(ticket);
        }
      });
    });

  }

}

