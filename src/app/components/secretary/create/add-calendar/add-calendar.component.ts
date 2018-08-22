import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../../servicies/post.service";
import {GetService} from "../../../../servicies/get.service";
import {Router} from "@angular/router";
import {Module} from "../../../models/Module";
import {Room} from "../../../models/Room";
import {Course} from "../../../models/Course";
import {LectureCalendar} from "../../../models/LectureCalendar";
import {DatePipe} from "@angular/common";
import {MatBottomSheet} from "@angular/material";
import {BottomSheetComponent} from "../../../bottom-sheet/bottom-sheet.component";
import {AuthService} from "../../../../servicies/auth.service";

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.css']
})
export class AddCalendarComponent implements OnInit {

  Hours = [
    '08:00:00',
    '08:30:00',
    '09:00:00',
    '09:30:00',
    '10:00:00',
    '10:30:00',
    '11:00:00',
    '11:30:00',
    '12:00:00',
    '12:30:00',
    '13:00:00',
    '13:30:00',
    '14:00:00',
    '14:30:00',
    '15:00:00',
    '15:30:00',
    '16:00:00',
    '16:30:00',
    '17:00:00',
    '17:30:00',
    '18:00:00',
    '18:30:00',
  ];

  tableEments = [
    {Hour: '08:00:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '08:30:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '09:00:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '09:30:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '10:00:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '10:30:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '11:00:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '11:30:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '12:00:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '12:30:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '13:00:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '13:30:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '14:00:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '14:30:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '15:00:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '15.30:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '16:00:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '16:30:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '17:00:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '17:30:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '18:00:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
    {Hour: '18:30:00', Monday: '', Tuesday: '', Wednesday: '', Thursday: '', Friday: '', Saturday: ''},
  ];

  days = [
    'Hour',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  startingHour = '';

  endingHour = '';

  endDate = '';

  dayLecture: Date;

  aulasFounded: Array<Room> = [];

  selectedAula: Room;

  leftHours = [];

  studyCourses: Course[] = [];

  studyCourse: Course;

  years = [];

  year: number;

  semester: number = 0;

  module: Module = {
    title: '',
    credits: 0,
    semester: 0,
    creditHour:0
  };

  unselectedTeaching = true;

  teachings: Module[] = [];

  lectureCalendar: LectureCalendar = {
    module: null,
    startTime: null,
    endTime: null,
    date: null,
    day: ''
  };

  lectureCalendars: Array<LectureCalendar> = [];

  errorLog = '';

  errorLogRoom = '';

  constructor(private postService: PostService,
              private getService: GetService,
              private router: Router,
              private datepipe: DatePipe,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.getService.findAllCourses().subscribe(studyCourses => {
      this.studyCourses = studyCourses;
      this.populateCalendar();
    });
  }

  populateYear(){
    this.years = [];
    for(let i = 0; i < this.studyCourse.year; i++){
      this.years.push(i + 1);
    }
  }

  populateCalendar() {
    if(((this.semester && this.year && this.studyCourse) != null)) {
      this.getService.findAllLectureCalendar().subscribe(lectureCalendars => {
        this.resetTable();
        this.lectureCalendars = [];
        for (let lectureCalendar of lectureCalendars) {
          if (lectureCalendar.module.year == this.year &&
            lectureCalendar.module.semester == this.semester &&
            lectureCalendar.module.course.courseId == this.studyCourse.courseId) {

            this.lectureCalendars.push(lectureCalendar);

            this.setHours(lectureCalendar.module.title, lectureCalendar.startTime,
              lectureCalendar.endTime, lectureCalendar.date);

            this.leftHoursForModule(lectureCalendar.module, lectureCalendar.startTime,
              lectureCalendar.endTime);
          }
        }
      });
    }
  }

  leftHoursForModule(module: Module, startTime: string, endTime: string){
    for(let i = 0; i < this.teachings.length; i++){
      if(this.teachings[i].moduleId == module.moduleId){
        let count = 0;
        let hourPicker = false;
        for(let k = 0; k < this.Hours.length; k++){
          if(startTime == this.tableEments[k].Hour){
            hourPicker = true;
          }else if(endTime == this.tableEments[k].Hour){
            hourPicker = false;
          }
          if (hourPicker) {
            count++;
          }
        }

        this.teachings[i].leftHours = this.teachings[i].creditHour - (count / 2);

      }
    }
  }

  resetTable(){
    for(let i = 0; i < this.tableEments.length; i++){
      this.tableEments[i].Monday = '';
      this.tableEments[i].Tuesday = '';
      this.tableEments[i].Wednesday = '';
      this.tableEments[i].Thursday = '';
      this.tableEments[i].Friday = '';
      this.tableEments[i].Saturday = '';
    }
  }

  setHours(title: string, startTime: string, endTime: string, date: string){
    let dateNumber = new Date(date).getDay();
    let hourPicker = false;
    switch (dateNumber) {
      case 1:
        for(let i = 0; i < this.tableEments.length; i++) {
          if(startTime == this.tableEments[i].Hour){
            hourPicker = true
          }else if(endTime == this.tableEments[i].Hour){
            hourPicker = false
          }
          if (hourPicker) {
            this.tableEments[i].Monday = title;
          }
        }
        break;

      case 2:
        for(let i = 0; i < this.tableEments.length; i++) {
          if(startTime == this.tableEments[i].Hour){
            hourPicker = true
          }else if(endTime == this.tableEments[i].Hour){
            hourPicker = false
          }
          if (hourPicker) {
            this.tableEments[i].Tuesday = title;
          }
        }
        break;

      case 3:
        for(let i = 0; i < this.tableEments.length; i++) {
          if(startTime == this.tableEments[i].Hour){
            hourPicker = true
          }else if(endTime == this.tableEments[i].Hour){
            hourPicker = false
          }
          if (hourPicker) {
            this.tableEments[i].Wednesday = title;
          }
        }
        break;

      case 4:
        for(let i = 0; i < this.tableEments.length; i++) {
          if(startTime == this.tableEments[i].Hour){
            hourPicker = true
          }else if(endTime == this.tableEments[i].Hour){
            hourPicker = false
          }
          if (hourPicker) {
            this.tableEments[i].Thursday = title;
          }
        }
        break;

      case 5:
        for(let i = 0; i < this.tableEments.length; i++) {
          if(startTime == this.tableEments[i].Hour){
            hourPicker = true
          }else if(endTime == this.tableEments[i].Hour){
            hourPicker = false
          }
          if (hourPicker) {
            this.tableEments[i].Friday = title;
          }
        }
        break;

      case 6:
        for(let i = 0; i < this.tableEments.length; i++) {
          if(startTime == this.tableEments[i].Hour){
            hourPicker = true
          }else if(endTime == this.tableEments[i].Hour){
            hourPicker = false
          }
          if (hourPicker) {
            this.tableEments[i].Saturday = title;
          }
        }
        break;

  }

  }

  getModules(){
    if(!((this.year || this.semester) == null)) {
      this.teachings = [];
      this.getService.findAllModulesByCourse(this.studyCourse).subscribe(returned => {
        if(returned != null) {
          for (let i = 0; i < returned.length; i++) {
            if (returned[i].semester == this.semester) {
              if (returned[i].year == this.year)
                this.teachings.push(returned[i]);
            }
          }

          for (let i = 0; i < this.teachings.length; i++) {

            switch (this.teachings[i].credits) {
              case 12:
                this.teachings[i].creditHour = 9;
                this.teachings[i].leftHours = this.teachings[i].creditHour;
                break;

              case 9:
                this.teachings[i].creditHour = 7;
                this.teachings[i].leftHours = this.teachings[i].creditHour;
                break;

              case 6:
                this.teachings[i].creditHour = 5;
                this.teachings[i].leftHours = this.teachings[i].creditHour;
                break;

              case 3:
                this.teachings[i].creditHour = 3;
                this.teachings[i].leftHours = this.teachings[i].creditHour;
                break;
            }

          }

        }

      });

    }

  }

  findAula(){

    this.aulasFounded = null;

    if(this.checkData('find')) {
      this.errorLog = '';
      this.lectureCalendar.module = this.module;
      this.lectureCalendar.startTime = this.startingHour;
      this.lectureCalendar.endTime = this.endingHour;
      this.lectureCalendar.date = this.datepipe.transform(this.dayLecture, 'yyyy-MM-dd');
      this.lectureCalendar.day = this.dayLecture.getDay().toString().toUpperCase();
      this.lectureCalendar.startDate = this.datepipe.transform(this.dayLecture, 'yyyy-MM-dd');
      this.lectureCalendar.endDate = this.datepipe.transform(this.endDate, 'yyyy-MM-dd');

      this.getService.findAllFreeAulas(this.lectureCalendar).subscribe(aulasFounded => {
        if (aulasFounded.length != 0) {
          this.errorLogRoom = '';
          this.aulasFounded = aulasFounded;
        } else {
          this.errorLogRoom = 'No free aulas founded change Hour';
        }
      });
    }else{
      this.errorLog = 'Insert all data';
    }
  }

  addDayLecture(){

    if(this.checkData('save')) {
      this.errorLog = '';
      this.lectureCalendar.room = this.selectedAula;
      this.postService.addNewDayLecture(this.lectureCalendar).subscribe();
    }else{
      this.errorLog = 'Insert all data';
    }
  }

  finished(){
    this.router.navigate(['seg-home']);
  }

  checkAulasSearched(){
    if(this.aulasFounded == null && this.errorLogRoom == ''){
      this.errorLogRoom = 'Search Aula first';
    }
  }


  checkData(key: string): boolean{
    switch (key) {
      case 'find':
        return (this.module != null && this.startingHour != '' && this.endingHour != '' && this.dayLecture != null);

      case 'save':
        return (this.module != null && this.startingHour != '' &&
          this.endingHour != '' && this.dayLecture != null && this.selectedAula != null);
    }
  }

  openBottomSheet(index: number, element: any, day: string): void {
    switch (day) {
      case 'MONDAY':
        for(let i = 0; i < this.lectureCalendars.length; i++){
          if('MONDAY' == this.lectureCalendars[i].day &&
            this.tableEments[index].Monday == this.lectureCalendars[i].module.title){
            this.getService.findEquipmentByRoom(this.lectureCalendars[i].room).subscribe(roomEquipments=>{
              this.lectureCalendars[i].roomEquipment = roomEquipments;
            });
            this.bottomSheet.open(BottomSheetComponent, {data: this.lectureCalendars[i]});
          }
        }
        break;

      case 'TUESDAY':
        for(let i = 0; i < this.lectureCalendars.length; i++){
          if('TUESDAY' == this.lectureCalendars[i].day &&
            this.tableEments[index].Tuesday == this.lectureCalendars[i].module.title){
            this.getService.findEquipmentByRoom(this.lectureCalendars[i].room).subscribe(roomEquipments=>{
              this.lectureCalendars[i].roomEquipment = roomEquipments;
            });
            this.bottomSheet.open(BottomSheetComponent, {data: this.lectureCalendars[i]});
          }
        }
        break;

      case 'WEDNESDAY':
        for(let i = 0; i < this.lectureCalendars.length; i++){
          if('WEDNESDAY' == this.lectureCalendars[i].day &&
            this.tableEments[index].Wednesday == this.lectureCalendars[i].module.title){
            this.getService.findEquipmentByRoom(this.lectureCalendars[i].room).subscribe(roomEquipments=>{
              this.lectureCalendars[i].roomEquipment = roomEquipments;
            });
            this.bottomSheet.open(BottomSheetComponent, {data: this.lectureCalendars[i]});
          }
        }
        break;

      case 'THURSDAY':
        for(let i = 0; i < this.lectureCalendars.length; i++){
          if('THURSDAY' == this.lectureCalendars[i].day &&
            this.tableEments[index].Thursday == this.lectureCalendars[i].module.title){
            this.getService.findEquipmentByRoom(this.lectureCalendars[i].room).subscribe(roomEquipments=>{
              this.lectureCalendars[i].roomEquipment = roomEquipments;
            });
            this.bottomSheet.open(BottomSheetComponent, {data: this.lectureCalendars[i]});
          }
        }
        break;

      case 'FRIDAY':
        for(let i = 0; i < this.lectureCalendars.length; i++){
          if('FRIDAY' == this.lectureCalendars[i].day &&
            this.tableEments[index].Friday == this.lectureCalendars[i].module.title){
            this.getService.findEquipmentByRoom(this.lectureCalendars[i].room).subscribe(roomEquipments=>{
              this.lectureCalendars[i].roomEquipment = roomEquipments;
            });
            this.bottomSheet.open(BottomSheetComponent, {data: this.lectureCalendars[i]});
          }
        }
        break;

      case 'SATURDAY':
        for(let i = 0; i < this.lectureCalendars.length; i++){
          if('SATURDAY' == this.lectureCalendars[i].day &&
            this.tableEments[index].Saturday == this.lectureCalendars[i].module.title){
            this.getService.findEquipmentByRoom(this.lectureCalendars[i].room).subscribe(roomEquipments=>{
              this.lectureCalendars[i].roomEquipment = roomEquipments;
            });
            this.bottomSheet.open(BottomSheetComponent, {data: this.lectureCalendars[i]});
          }
        }
        break;

    }

  }

}