import { Component, OnInit } from '@angular/core';
import {RoutingService} from '../../../../servicies/routing.service';
import {AuthService} from '../../../../servicies/auth.service';
import {Course} from '../../../models/Course';
import {Module} from '../../../models/Module';
import {LectureCalendar} from '../../../models/LectureCalendar';
import {GetService} from '../../../../servicies/get.service';
import {FormControl} from '@angular/forms';
import {Room} from '../../../models/Room';
import {DatePipe} from '@angular/common';
import {PutService} from '../../../../servicies/put.service';
import {calcPossibleSecurityContexts} from '@angular/compiler/src/template_parser/binding_parser';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-modify-calendar',
  templateUrl: './modify-calendar.component.html',
  styleUrls: ['./modify-calendar.component.css']
})
export class ModifyCalendarComponent implements OnInit {
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

  selectedCourse: Course;
  selectedTeaching: Module;
  selectedLesson: LectureCalendar;

  courses: Array<Course>;
  teachings: Array<Module>;
  lessons: Array<LectureCalendar> = [];
  aulasFounded: Array<Room> = [];

  errorColor: string = 'accent';

  all: string = "false";

  previousDate: FormControl;

  teachingEnable: boolean = true;

  errorLogRoom: string = '';

  constructor(private router: RoutingService,
              private authService: AuthService,
              private datepipe: DatePipe,
              private getService: GetService,
              private putService: PutService,
              private angularFirestore: AngularFirestore) { }

  ngOnInit() {
    this.router.currentLocation('modify-calendar');
    if(this.authService.isLoggednIn()) {
      this.getService.findAllCourses().subscribe(courses=>{
        this.courses=courses;
      });
    }else{
      this.router.navigate('');
    }
  }

  findTeachings(course: Course){
    this.teachings = [];
    this.getService.findAllModulesByCourse(course).subscribe(teachings=>{
      this.teachings = teachings;
      this.teachingEnable = false;
    });
  }

  findLessons(teaching: Module){
    this.lessons = [];
    this.getService.findLessonByTeaching(teaching).subscribe(lessons=>{
      let today = new Date();
      lessons.forEach(lesson=>{
        lesson.dDate = new Date(lesson.date);
        if (today.getMonth() <= lesson.dDate.getMonth() && today.getDate() <= lesson.dDate.getDate()){
          this.lessons.push(lesson);
        }
      });
    });
  }

  validateDate(){
    console.log(this.selectedLesson);
    this.previousDate = new FormControl(this.selectedLesson.dDate);
    this.selectedLesson.startDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.selectedLesson.endDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.findAula();
    console.log(this.all);
  }


  findAula(){
    if(this.selectedLesson.startTime < this.selectedLesson.endTime) {
      this.errorColor = 'accent';
      this.getService.findAllFreeAulas(this.selectedLesson).subscribe(aulasFounded => {
        if (aulasFounded.length != 0) {
          this.errorLogRoom = '';
          this.aulasFounded = aulasFounded;
        } else {
          this.errorLogRoom = 'No free aulas founded change Hour';
        }
      });
    }else{
      this.errorColor = 'warn';
    }
  }

  submit() {
    console.log(this.selectedTeaching);
    if (this.all == 'true') {
      let lessBuff: Array<LectureCalendar> = [];
      this.lessons.forEach(lesson => {
        if (lesson.day == this.selectedLesson.day && lesson.date >= this.selectedLesson.date) {
          lessBuff.push(lesson);
        }
      });
      for (let k = 0; k < lessBuff.length; k++) {
        lessBuff[k].dDate = this.selectedLesson.dDate;
        lessBuff[k].date = this.datepipe.transform(this.selectedLesson.dDate, "yyyy-MM-dd");
        lessBuff[k].startTime = this.selectedLesson.startTime;
        lessBuff[k].endTime = this.selectedLesson.endTime;
        lessBuff[k].room = this.selectedLesson.room;
        lessBuff[k].day = ModifyCalendarComponent.getDaty(this.selectedLesson.dDate.getDay());
        lessBuff[k].startDate = this.datepipe.transform(this.selectedLesson.dDate, "yyyy-MM-dd");
        lessBuff[k].endDate = this.datepipe.transform(this.selectedLesson.dDate, "yyyy-MM-dd");
        this.putService.updateDayLecture(lessBuff[k]).subscribe();
        this.selectedLesson.dDate.setDate(this.selectedLesson.dDate.getDate() + 7);
      }
      let moduleId = this.selectedTeaching.moduleId;
      let notify = {
        mod: moduleId,
        text: 'Updated calendar'
      };
      console.log(notify);
      this.angularFirestore.collection('modules').doc(''+moduleId)
        .collection('notifications').add(notify).then(ret=>{
        this.router.backUrl('modify-calendar');
      });
    } else {
      let moduleId = this.selectedTeaching.moduleId;
      this.selectedLesson.date = this.datepipe.transform(this.selectedLesson.dDate, "yyyy-MM-dd");
      this.putService.updateDayLecture(this.selectedLesson).subscribe(ret=>{
        let notify = {
          mod: moduleId,
          text: 'Updated calendar'
        };
        console.log(notify);
        this.angularFirestore.collection('modules').doc(''+moduleId)
          .collection('notifications').add(notify).then();
      });
    }

    this.lessons = [];
    this.teachings = [];
    this.selectedTeaching = null;
    this.selectedLesson = null;
  }


  static getDaty(day: number){
    switch (day) {
      case 1:
        return "MONDAY";
      case 2:
        return "TUESDAY";
      case 3:
        return "WEDNESDAY";
      case 4:
        return "THURSDAY";
      case 5:
        return "FRIDAY"
    }
  }

}
