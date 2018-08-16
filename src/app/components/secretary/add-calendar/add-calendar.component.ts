import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../servicies/post.service";
import {GetService} from "../../../servicies/get.service";
import {Router} from "@angular/router";
import {StudyCourse} from "../../models/StudyCourse";
import {Teaching} from "../../models/Teaching";
import {Room} from "../../models/Room";
import {Calendar} from "../../models/Calendar";
import {Hours} from "../../models/Hours";

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.css']
})
export class AddCalendarComponent implements OnInit {

  data = [
    {hour: "8-9"},
    {hour: "9-10"},
    {hour: "10-11"},
    {hour: "11-12"},
    {hour: "12-13"},
    {hour: "13-14"},
    {hour: "14-15"},
    {hour: "15-16"},
    {hour: '16-17'},
    {hour: "17-18"},
    {hour: "18-19"}];

  dayS = {

    monday: [
        {firstHalfSelected: null, secondHalfSelected: null},
        {firstHalfSelected: null, secondHalfSelected: null},
        {firstHalfSelected: null, secondHalfSelected: null},
        {firstHalfSelected: null, secondHalfSelected: null},
        {firstHalfSelected: null, secondHalfSelected: null},
        {firstHalfSelected: null, secondHalfSelected: null},
        {firstHalfSelected: null, secondHalfSelected: null},
        {firstHalfSelected: null, secondHalfSelected: null},
        {firstHalfSelected: null, secondHalfSelected: null},
        {firstHalfSelected: null, secondHalfSelected: null},
        {firstHalfSelected: null, secondHalfSelected: null}],

    tuesday: [
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false}],

    wednesday: [
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false}],

    thursday: [
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false}],

    friday: [
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false}],

    saturday: [
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false},
        {firstHalfSelected: false, secondHalfSelected: false}]};

  days = [
    'hours',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];

  aulas: Room[] = [];

  studyCourses: StudyCourse[] = [];
  studyCourse: StudyCourse;

  semester: number = 0;

  teaching: Teaching = {
    name: '',
    credits: 0,
    semester: 0,
    description: ''
  };

  teachings: Teaching[] = [];

  leftHours: number = 0;

  hoursSelected: number = 0;

  tooMuchHourError: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false];

  unselectedTeaching: boolean = false;


  selectedAula: Room = {
    name: '',
    capacity: 0,
    longitude: 0,
    latitude: 0,
    equipments: []
  };

  constructor(private postService: PostService,
              private getService: GetService,
              private router: Router) { }

  ngOnInit() {
    this.getService.getStudyCourseList().subscribe(studyCourses => {
      console.log(studyCourses[0].name);
      console.log(studyCourses[1].name);
      this.studyCourses = studyCourses;
    });
  }

  getTeachings(){
    this.getService.getTeachingsById(this.studyCourse.id).subscribe(returned => {

      for(let i = 0; i < returned.length; i++) {
        if (returned[i].semester == this.semester){
          this.teachings.push(returned[i]);
        }
      }

      for(let i = 0; i < this.teachings.length; i++){

        switch (this.teachings[i].credits) {
          case 12:
            this.teachings[i].hours = 9;
            this.teachings[i].leftHours = this.teachings[i].hours;
            break;

          case 9:
            this.teachings[i].hours = 7;
            this.teachings[i].leftHours = this.teachings[i].hours;
            break;

          case 6:
            this.teachings[i].hours = 5;
            this.teachings[i].leftHours = this.teachings[i].hours;
            break;

          case 3:
            this.teachings[i].hours = 3;
            this.teachings[i].leftHours = this.teachings[i].hours;
            break;
        }

      }

    });

  }

  findAula(){

    let hours = [];

    for(let i = 0; i < this.dayS.monday.length; i++){

    //   let hour: Hours = {
    //     start: ,
    //     end: ,
    //     day: Array<String>;
    // };
    }



    this.postService.getAulas().subscribe(aulas => {
      this.aulas = aulas;
    });
  }


  changeState(index: number, day:number){

    let count = 0;
    this.unselectedTeaching = this.teaching.name == '';

    if(!this.unselectedTeaching) {
      switch (day) {
        case 1:
          if (index % 2 == 0) {
            if (this.dayS.monday[index / 2].firstHalfSelected == null) {
              this.dayS.monday[index / 2].firstHalfSelected = true;
              this.hoursSelected++;
            } else {
              if (this.dayS.monday[index / 2].firstHalfSelected) {
                this.hoursSelected--;
              } else {
                this.hoursSelected++;
              }
              this.dayS.monday[index / 2].firstHalfSelected = !this.dayS.monday[index / 2].firstHalfSelected;
            }
          } else {
            let ind = (index / 2) + 0.5 - (index % 2);
            if (this.dayS.monday[ind].secondHalfSelected == null) {
              this.dayS.monday[ind].secondHalfSelected = true;
              this.hoursSelected++;
            } else {
              if (this.dayS.monday[ind].secondHalfSelected) {
                this.hoursSelected--;
              } else {
                this.hoursSelected++;
              }
              this.dayS.monday[ind].secondHalfSelected = !this.dayS.monday[ind].secondHalfSelected;
            }
          }

          for (let i = 0; i < this.dayS.monday.length; i++) {
            if (this.dayS.monday[i].firstHalfSelected) {
              count++;
            }
            if (this.dayS.monday[i].secondHalfSelected) {
              count++;
            }

          }

          break;


        case 2:
          if (index % 2 == 0) {
            if (this.dayS.tuesday[index / 2].firstHalfSelected == null) {
              this.dayS.tuesday[index / 2].firstHalfSelected = true;
              this.hoursSelected++;
            } else {
              if (this.dayS.tuesday[index / 2].firstHalfSelected) {
                this.hoursSelected--;
              } else {
                this.hoursSelected++;
              }
              this.dayS.tuesday[index / 2].firstHalfSelected = !this.dayS.tuesday[index / 2].firstHalfSelected;
            }
          } else {
            let ind = (index / 2) + 0.5 - (index % 2);
            if (this.dayS.tuesday[ind].secondHalfSelected == null) {
              this.dayS.tuesday[ind].secondHalfSelected = true;
              this.hoursSelected++;
            } else {
              if (this.dayS.tuesday[ind].secondHalfSelected) {
                this.hoursSelected--;
              } else {
                this.hoursSelected++;
              }
              this.dayS.tuesday[ind].secondHalfSelected = !this.dayS.tuesday[ind].secondHalfSelected;
            }
          }

          for (let i = 0; i < this.dayS.tuesday.length; i++) {
            if (this.dayS.tuesday[i].firstHalfSelected) {
              count++;
            } else if (this.dayS.tuesday[i].secondHalfSelected) {
              count++;
            }

          }

          break;


        case 3:
          if (index % 2 == 0) {
            if (this.dayS.wednesday[index / 2].firstHalfSelected == null) {
              this.dayS.wednesday[index / 2].firstHalfSelected = true;
              this.hoursSelected++;
            } else {
              if (this.dayS.wednesday[index / 2].firstHalfSelected) {
                this.hoursSelected--;
              } else {
                this.hoursSelected++;
              }
              this.dayS.wednesday[index / 2].firstHalfSelected = !this.dayS.wednesday[index / 2].firstHalfSelected;
            }
          } else {
            let ind = (index / 2) + 0.5 - (index % 2);
            if (this.dayS.wednesday[ind].secondHalfSelected == null) {
              this.dayS.wednesday[ind].secondHalfSelected = true;
              this.hoursSelected++;
            } else {
              if (this.dayS.wednesday[ind].secondHalfSelected) {
                this.hoursSelected--;
              } else {
                this.hoursSelected++;
              }
              this.dayS.wednesday[ind].secondHalfSelected = !this.dayS.wednesday[ind].secondHalfSelected;
            }
          }

          for (let i = 0; i < this.dayS.wednesday.length; i++) {
            if (this.dayS.wednesday[i].firstHalfSelected) {
              count++;
            } else if (this.dayS.wednesday[i].secondHalfSelected) {
              count++;
            }

          }

          break;


        case 4:
          if (index % 2 == 0) {
            if (this.dayS.thursday[index / 2].firstHalfSelected == null) {
              this.dayS.thursday[index / 2].firstHalfSelected = true;
              this.hoursSelected++;
            } else {
              if (this.dayS.thursday[index / 2].firstHalfSelected) {
                this.hoursSelected--;
              } else {
                this.hoursSelected++;
              }
              this.dayS.thursday[index / 2].firstHalfSelected = !this.dayS.thursday[index / 2].firstHalfSelected;
            }
          } else {
            let ind = (index / 2) + 0.5 - (index % 2);
            if (this.dayS.thursday[ind].secondHalfSelected == null) {
              this.dayS.thursday[ind].secondHalfSelected = true;
              this.hoursSelected++;
            } else {
              if (this.dayS.thursday[ind].secondHalfSelected) {
                this.hoursSelected--;
              } else {
                this.hoursSelected++;
              }
              this.dayS.thursday[ind].secondHalfSelected = !this.dayS.thursday[ind].secondHalfSelected;
            }
          }

          for (let i = 0; i < this.dayS.thursday.length; i++) {
            if (this.dayS.thursday[i].firstHalfSelected) {
              count++;
            } else if (this.dayS.thursday[i].secondHalfSelected) {
              count++;
            }

          }

          break;


        case 5:
          if (index % 2 == 0) {
            if (this.dayS.friday[index / 2].firstHalfSelected == null) {
              this.dayS.friday[index / 2].firstHalfSelected = true;
              this.hoursSelected++;
            } else {
              if (this.dayS.friday[index / 2].firstHalfSelected) {
                this.hoursSelected--;
              } else {
                this.hoursSelected++;
              }
              this.dayS.friday[index / 2].firstHalfSelected = !this.dayS.friday[index / 2].firstHalfSelected;
            }
          } else {
            let ind = (index / 2) + 0.5 - (index % 2);
            if (this.dayS.friday[ind].secondHalfSelected == null) {
              this.dayS.friday[ind].secondHalfSelected = true;
              this.hoursSelected++;
            } else {
              if (this.dayS.friday[ind].secondHalfSelected) {
                this.hoursSelected--;
              } else {
                this.hoursSelected++;
              }
              this.dayS.friday[ind].secondHalfSelected = !this.dayS.friday[ind].secondHalfSelected;
            }
          }

          for (let i = 0; i < this.dayS.friday.length; i++) {
            if (this.dayS.friday[i].firstHalfSelected) {
              count++;
            } else if (this.dayS.friday[i].secondHalfSelected) {
              count++;
            }

          }

          break;


        case 6:
          if (index % 2 == 0) {
            if (this.dayS.saturday[index / 2].firstHalfSelected == null) {
              this.dayS.saturday[index / 2].firstHalfSelected = true;
              this.hoursSelected++;
            } else {
              if (this.dayS.saturday[index / 2].firstHalfSelected) {
                this.hoursSelected--;
              } else {
                this.hoursSelected++;
              }
              this.dayS.saturday[index / 2].firstHalfSelected = !this.dayS.saturday[index / 2].firstHalfSelected;
            }
          } else {
            let ind = (index / 2) + 0.5 - (index % 2);
            if (this.dayS.saturday[ind].secondHalfSelected == null) {
              this.dayS.saturday[ind].secondHalfSelected = true;
              this.hoursSelected++;
            } else {
              if (this.dayS.saturday[ind].secondHalfSelected) {
                this.hoursSelected--;
              } else {
                this.hoursSelected++;
              }
              this.dayS.saturday[ind].secondHalfSelected = !this.dayS.saturday[ind].secondHalfSelected;
            }
          }

          for (let i = 0; i < this.dayS.saturday.length; i++) {
            if (this.dayS.saturday[i].firstHalfSelected) {
              count++;
            } else if (this.dayS.saturday[i].secondHalfSelected) {
              count++;
            }

          }
          break;
      }

      this.tooMuchHourError[day] = count > 6;

      for (let i = 0; i < this.teachings.length; i++) {
        if (this.teachings[i].id == this.teaching.id) {
          this.teachings[i].leftHours = this.teaching.hours - (this.hoursSelected / 2);
        }

      }

    }

  }

}
