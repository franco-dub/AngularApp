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

  radioEna = false;

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
      lessons.filter(calendar => new Date(calendar.calendarDate.date) >= new Date());
      this.lessons = lessons;
      /* lessons.forEach(lesson=>{
        lesson.calendarDate.dDate = new Date(lesson.calendarDate.date);
        if (today.getMonth() <= lesson.calendarDate.dDate.getMonth() 
                        && today.getDate() <= lesson.calendarDate.dDate.getDate()){
          this.lessons.push(lesson);
        }
      }); */
    });
  }

  validateDate(){
    console.log(this.selectedLesson);
    this.radioEna = !!this.selectedLesson.calendarDate.type.match("EXAM");
    
    this.selectedLesson.calendarDate.dDate = new Date(this.selectedLesson.calendarDate.date);
    this.previousDate = new FormControl(this.selectedLesson.calendarDate.dDate);
    this.selectedLesson.calendarDate.startDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.selectedLesson.calendarDate.endDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.findAula();
    console.log(this.all);
  }


  findAula(){
    if(this.selectedLesson.calendarDate.startTime < this.selectedLesson.calendarDate.endTime) {
      this.errorColor = 'accent';
      this.selectedLesson.calendarDate.startDate = this.datepipe.transform(this.selectedLesson.calendarDate.dDate, 'yyyy-MM-dd');
      this.selectedLesson.calendarDate.endDate = this.datepipe.transform(this.selectedLesson.calendarDate.dDate, 'yyyy-MM-dd');
      this.selectedLesson.calendarDate.date = this.datepipe.transform(this.selectedLesson.calendarDate.dDate, 'yyyy-MM-dd');
      this.getService.findAllFreeAulas(this.selectedLesson).subscribe(aulasFounded => {
        if (aulasFounded.length != 0) {
          this.errorLogRoom = '';
          this.aulasFounded = aulasFounded;
        } else {
          this.errorLogRoom = 'Aula non trovata. Cambia l\'ora';
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
        if (lesson.day == this.selectedLesson.day && lesson.calendarDate.date >= this.selectedLesson.calendarDate.date) {
          lessBuff.push(lesson);
        }
      });
      for (let k = 0; k < lessBuff.length; k++) {
        lessBuff[k].calendarDate.dDate = this.selectedLesson.calendarDate.dDate;
        lessBuff[k].calendarDate.date = this.datepipe.transform(this.selectedLesson.calendarDate.dDate, "yyyy-MM-dd");
        lessBuff[k].calendarDate.startTime = this.selectedLesson.calendarDate.startTime;
        lessBuff[k].calendarDate.endTime = this.selectedLesson.calendarDate.endTime;
        lessBuff[k].room = this.selectedLesson.room;
        lessBuff[k].day = ModifyCalendarComponent.getDaty(this.selectedLesson.calendarDate.dDate.getDay());
        lessBuff[k].calendarDate.startDate = this.datepipe.transform(this.selectedLesson.calendarDate.dDate, "yyyy-MM-dd");
        lessBuff[k].calendarDate.endDate = this.datepipe.transform(this.selectedLesson.calendarDate.dDate, "yyyy-MM-dd");
        this.putService.updateDayLecture(lessBuff[k]).subscribe();
        this.selectedLesson.calendarDate.dDate.setDate(this.selectedLesson.calendarDate.dDate.getDate() + 7);
      }
      let moduleId = this.selectedTeaching.moduleId;
      let notify = {
        module: moduleId,
        text: 'Calendario Aggiornato'
      };
      console.log(notify);
      this.angularFirestore.collection('modules').doc(''+moduleId)
        .collection('notifications').add(notify).then(ret=>{
        this.router.backUrl('modify-calendar');
      });
    } else {
      let moduleId = this.selectedTeaching.moduleId;
      this.selectedLesson.calendarDate.date = this.datepipe.transform(this.selectedLesson.calendarDate.dDate, "yyyy-MM-dd");
      this.selectedLesson.day = ModifyCalendarComponent.getDaty(this.selectedLesson.calendarDate.dDate.getDay());
      this.putService.updateDayLecture(this.selectedLesson).subscribe(ret=>{
        let notify = {
          module: moduleId,
          text: 'Calendario aggiornato'
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
