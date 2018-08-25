import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {Ticket} from '../../models/Ticket';
import {RoomEquipment} from '../../models/RoomEquipment';
import {GetService} from '../../../servicies/get.service';
import {PutService} from '../../../servicies/put.service';

@Component({
  selector: 'app-bottom-sheet-secretary',
  templateUrl: './bottom-sheet-secretary.component.html',
  styleUrls: ['./bottom-sheet-secretary.component.css']
})
export class BottomSheetSecretaryComponent implements OnInit {

  ticket: Ticket;
  type: string;
  roomEquipments: Array<RoomEquipment> = [];
  selected: RoomEquipment;
  newComment = '';

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private data: any, private getService: GetService,
              private putService: PutService) { }

  ngOnInit() {
    this.ticket = this.data.ticket as Ticket;
    this.type = this.data.type as string;
    this.getService.findEquipmentByRoom(this.ticket.room).subscribe(roomEquipments => {
      this.roomEquipments = roomEquipments;
    });
  }
  saveStatus() {
    this.ticket.comment = this.newComment;
    this.ticket.status = this.type;
    if (this.roomEquipments.length != 0) {
      this.putService.updateRoomEquipment(this.roomEquipments).subscribe();

    }

    this.putService.updateTicket(this.ticket).subscribe(ticket => {
      this.data = ticket;
    });

  }

  optionChecked(index: number) {
    if (this.roomEquipments[index].work) {
      this.roomEquipments[index].work = 0;
    } else {
      this.roomEquipments[index].work = 1;
    }
  }
}
