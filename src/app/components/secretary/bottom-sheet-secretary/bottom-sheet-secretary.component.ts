import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {Ticket} from '../../models/Ticket';
import {RoomEquipment} from '../../models/RoomEquipment';
import {GetService} from '../../../servicies/get.service';
import {PutService} from '../../../servicies/put.service';
import {SegHomeComponent} from '../seg-home/seg-home.component';
import {AngularFirestore} from '@angular/fire/firestore';

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

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) private data: any,
              private getService: GetService,
              private putService: PutService,
              private bottomSheetRef: MatBottomSheetRef<SegHomeComponent>,
              private angularFirestore: AngularFirestore) {
  }

  ngOnInit() {
    this.ticket = this.data[1].ticket as Ticket;
    this.type = this.data[0].type as string;
    this.getService.findEquipmentByRoom(this.ticket.room).subscribe(roomEquipments => {
      this.roomEquipments = roomEquipments;
      console.log(this.type);
      console.log(this.ticket);
      console.log(this.roomEquipments);
    });
  }

  saveStatus(stat:string) {
    this.ticket.comment = this.newComment;
    this.ticket.status = stat;

    if (this.roomEquipments.length != 0) {
      this.putService.updateRoomEquipment(this.roomEquipments).subscribe();
    }

    this.putService.updateTicket(this.ticket).subscribe(ticket => {
      let notify = {
        title: ticket.title,
        ans: ticket.comment
      };
      this.angularFirestore.collection('tickets').doc(''+this.ticket.professor.person.personId)
        .collection('notifications').add(notify).then(ret=>{
          this.data = ticket;
        this.bottomSheetRef.dismiss();

      });
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

