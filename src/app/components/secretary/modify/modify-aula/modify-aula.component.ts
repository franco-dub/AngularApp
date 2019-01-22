import { Component, OnInit } from '@angular/core';
import {GetService} from '../../../../servicies/get.service';
import {Router} from '@angular/router';
import {Room} from '../../../models/Room';
import {RoomEquipment} from '../../../models/RoomEquipment';
import {Equipments} from '../../../models/Equipments';
import {PutService} from '../../../../servicies/put.service';

@Component({
  selector: 'app-modify-aula',
  templateUrl: './modify-aula.component.html',
  styleUrls: ['./modify-aula.component.css']
})
export class ModifyAulaComponent implements OnInit {

  selectedRoom: Room = null;

  rooms: Array<Room> = [];

  roomEquipments: Array<RoomEquipment> = [];

  equipments: Array<Equipments> = [];

  columns = 4;

  latitude = '';

  longitude = '';

  location = '';

  constructor(private putService: PutService, private getService: GetService, private router: Router) { }

  ngOnInit() {
    this.getService.findAllRoom().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  optionsChecked(index: number): void {
    this.equipments[index].aulaHasEquipment = !this.equipments[index].aulaHasEquipment;
  }

  findRoomEquipment() {
    this.getService.getEquipmentData().subscribe(equipments => {

      if (equipments != null) {

        this.equipments = equipments;

        this.getService.findEquipmentByRoom(this.selectedRoom).subscribe(roomEquipments => {

          this.roomEquipments = roomEquipments;
          const location = this.selectedRoom.location.split(', ');
          console.log(location);
          this.longitude = location[0];
          this.latitude = location[1];

          let i = 0;
          for (const equipment of this.equipments) {
            for (const roomEquipment of this.roomEquipments) {
              if (equipment.equipmentId == roomEquipment.equipment.equipmentId) {
                console.log(equipment);
                console.log(roomEquipment);
                this.equipments[i].aulaHasEquipment = true;
              }
            }
            i++;
          }
        });
      }
    });

  }

  onSubmit(): void {


    let i: number;
    const checkedEquipments = [];

    for (i = 0; i < this.equipments.length; i++) {
      if (this.equipments[i].aulaHasEquipment == null) {
        this.equipments[i].aulaHasEquipment = false;
      }
      if (this.equipments[i].aulaHasEquipment) {
        checkedEquipments.push(this.equipments[i]);
      }
    }
    this.selectedRoom.location = this.longitude + ', ' + this.latitude;

    const roomEquipment: Array<RoomEquipment> = [];

    this.putService.updateRoom(this.selectedRoom).subscribe(aula => {
      console.log(aula);
      if (aula != null) {
        for (const equipmen of checkedEquipments) {
          roomEquipment.push({
            room: aula,
            equipment: equipmen,
            issue: '',
            work: 1
          });
        }
        console.log(roomEquipment);
        this.putService.updateRoomEquipment(roomEquipment).subscribe(roomEquipments => {
          if (roomEquipments != null) {
            this.router.navigate(['seg-home']);
          }
        });
      }
    });

  }


}
