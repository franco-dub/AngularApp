import { Component, OnInit } from '@angular/core';
import {Equipments} from "../../models/Equipments";
import {GetService} from "../../../servicies/get.service";
import {Router} from "@angular/router";
import {PostService} from "../../../servicies/post.service";
import {
  AbstractControl,
  FormArray,
  FormBuilder, FormControl,
  FormControlName,
  FormGroup,
  ValidatorFn
} from "@angular/forms";
import {Aula} from "../../models/Aula";


@Component({
  selector: 'app-add-aula',
  templateUrl: './add-aula.component.html',
  styleUrls: ['./add-aula.component.css']
})
export class AddAulaComponent implements OnInit {

  myForm: FormGroup;

  public equipments: Equipments[] = null;

  columns: number = 4;

  row: number = 0;

  constructor(private fb: FormBuilder,
              private getService: GetService,
              private router: Router,
              private postService: PostService) {

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

    let aula: Aula = {
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
