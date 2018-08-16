///<reference path="../../../../node_modules/@angular/forms/src/model.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GetService} from "../../servicies/get.service";
import {Router} from "@angular/router";
import {Equipments} from "../models/Equipments";
import {Room} from "../models/Room";
import {PostService} from "../../servicies/post.service";

@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.css']
})

export class ProvaComponent implements OnInit {

  myForm: FormGroup;

  public equipments: Equipments[] = null;

  constructor(private fb: FormBuilder,
              private getService: GetService,
              private router: Router,
              private postService: PostService){

  this.myForm = this.fb.group({

    name: new FormControl(''),

    capacity: new FormControl(0),

    longitude: new FormControl(0),

    latitude: new FormControl(0),

  });

}

  ngOnInit() {

    this.getService.getEquipmentData().subscribe(equipments => {

      this.equipments = equipments;

      this.myForm = this.fb.group({

        name: new FormControl(''),

        capacity: new FormControl(0),

        longitude: new FormControl(0),

        latitude: new FormControl(0),

      });

    });

  }

  optionsChecked(index: number): void{
    this.equipments[index].aulaHasEquipment = !this.equipments[index].aulaHasEquipment;
  }

  onSubmit(): void {


    let i: number;
    let checkedEquipments = [] ;

    for(i = 0; i < this.equipments.length; i++) {
      if (this.equipments[i].aulaHasEquipment == null) {
        this.equipments[i].aulaHasEquipment = false
      }
      if(this.equipments[i].aulaHasEquipment){
        checkedEquipments.push(this.equipments[i]);
      }
    }

    let aula : Room = {
      name: this.myForm.get('name').value,
      capacity: this.myForm.get('capacity').value,
      latitude: this.myForm.get('latitude').value,
      longitude: this.myForm.get('longitude').value,
      equipments: checkedEquipments
    };

    this.postService.saveNewAula(aula).subscribe(prova => {
      console.log(prova);
    });

  }

}
