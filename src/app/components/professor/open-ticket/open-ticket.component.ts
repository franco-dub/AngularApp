import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../servicies/post.service';
import {GetService} from '../../../servicies/get.service';
import {RoutingService} from '../../../servicies/routing.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Room} from '../../models/Room';
import {RoomEquipment} from '../../models/RoomEquipment';
import {Ticket} from '../../models/Ticket';
import {AuthService} from '../../../servicies/auth.service';
import {Professor} from '../../models/Professor';
import { PutService } from '../../../servicies/put.service';

@Component({
  selector: 'app-open-ticket',
  templateUrl: './open-ticket.component.html',
  styleUrls: ['./open-ticket.component.css']
})
export class OpenTicketComponent implements OnInit {

  openTicketForm: FormGroup;
  rooms: Array<Room> = [];
  roomEquipments: Array<RoomEquipment> = [];
  selectedRoomEquipment: RoomEquipment;
  // @ts-ignore
  ticket: Ticket = {};
  prof: Professor;

  constructor( public putService: PutService,
              private postService: PostService,
              private getService: GetService,
              private router: RoutingService,
              private formBuilder: FormBuilder,
              private authent: AuthService) { }

  ngOnInit() {
    this.getService.findAllRoom().subscribe(rooms => {
      this.rooms = rooms;
    });
    this.openTicketForm = this.formBuilder.group({
      title: null,
      room: null,
      equipment: null,
      description: null
    });
  }

  findRoomEquipment() {
    this.getService.findEquipmentByRoom(this.openTicketForm.controls['room'].value).subscribe(roomEquipments => {
      this.roomEquipments = roomEquipments;
    });
  }

  onSubmitForm() {
    // non mi sembra abbastanza giusto fare queste due operazioni da front end
    // ma per questioni di tempo, dato che eseguirle da back end porta troppe modifiche,
    // l'ho fatto comunque

    //create ticket
    this.ticket.room = this.openTicketForm.controls['room'].value;
    this.ticket.description = this.openTicketForm.controls['description'].value;
    this.ticket.title = this.openTicketForm.controls['title'].value;
    this.ticket.professor = this.authent.getLoggedUser('user');
    // update roomequipment
    this.selectedRoomEquipment = this.openTicketForm.controls['room'].value;
    this.selectedRoomEquipment = this.openTicketForm.controls['equipment'].value;
    this.selectedRoomEquipment.issue = this.openTicketForm.controls['description'].value;
    this.selectedRoomEquipment.work = -1;
     this.postService.sendTicket(this.ticket).subscribe(ticket => {
      if (ticket != null){
        console.log(this.selectedRoomEquipment);
        this.putService.updateRoomEquipment2(this.selectedRoomEquipment)
        .subscribe( roomEquipment =>{
          if (roomEquipment != null)
            this.router.navigate('seg-home');
        });
      }
    }); 
  }
}
