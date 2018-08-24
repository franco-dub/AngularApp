import { Component, OnInit } from '@angular/core';
import {Equipments} from "../../../models/Equipments";
import {GetService} from "../../../../servicies/get.service";
import {PostService} from "../../../../servicies/post.service";
import {Room} from "../../../models/Room";
import {RoomEquipment} from "../../../models/RoomEquipment";
import {RoutingService} from "../../../../servicies/routing.service";


@Component({
  selector: 'app-add-aula',
  templateUrl: './add-aula.component.html',
  styleUrls: ['./add-aula.component.css']
})
export class AddAulaComponent implements OnInit {

  equipments: Equipments[] = null;

  columns: number = 4;

  name: string = '';

  capacity: number = null;

  row: number = 0;

  location: string = '';

  longitude: string = '';

  latitude: string = '';

  constructor(private getService: GetService,
              private router: RoutingService,
              private postService: PostService) { }

  ngOnInit() {

    if(this.router.getHistory()[this.router.getHistory().length - 1] != 'add-aula') {
      this.router.loadUrl('add-aula');
    }
    this.getService.getEquipmentData().subscribe(equipments => {

      this.equipments = equipments;

      let division = equipments.length % 4;

      console.log(division);

      if( division != 0){
        this.row = 1
      }

    });

  }

  optionsChecked(index: number): void {
    this.equipments[index].aulaHasEquipment = !this.equipments[index].aulaHasEquipment;
  }

  onSubmit(): void {


    let i: number;
    let checkedEquipments = [];

    for (i = 0; i < this.equipments.length; i++) {
      if (this.equipments[i].aulaHasEquipment == null) {
        this.equipments[i].aulaHasEquipment = false
      }
      if (this.equipments[i].aulaHasEquipment) {
        checkedEquipments.push(this.equipments[i]);
      }
    }

    this.location = this.longitude + ", " + this.latitude;

    let aul: Room = {
      name: this.name,
      capacity: this.capacity,
      location: this.location,
      equipments: checkedEquipments
    };

    let roomEquipment: Array<RoomEquipment> = [];



    this.postService.saveNewAula(aul).subscribe(aula => {
      console.log(aula);
      if(aula != null) {
        for(let equipmen of checkedEquipments) {
          roomEquipment.push({
            room: aula,
            equipment: equipmen,
            issue: '',
            work: 1
          });
        }
        console.log(roomEquipment);
        this.postService.saveAulaEquipments(roomEquipment).subscribe(roomEquipments => {
          if (roomEquipments != null)
            this.router.navigate('seg-home');
        });
      }
    });

  }
}
