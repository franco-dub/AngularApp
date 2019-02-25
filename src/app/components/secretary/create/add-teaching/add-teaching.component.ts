import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../../servicies/post.service';
import {Module} from '../../../models/Module';
import {GetService} from '../../../../servicies/get.service';
import {Course} from '../../../models/Course';
import {Professor} from '../../../models/Professor';
import {RoutingService} from '../../../../servicies/routing.service';
import {AuthService} from '../../../../servicies/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-add-teaching',
  templateUrl: './add-teaching.component.html',
  styleUrls: ['./add-teaching.component.css']
})
export class AddTeachingComponent implements OnInit {


  teaching: Module;

  name = '';
  credits = 0;
  description = '';
  semester = 0;
  year = 0;

  numbers: Array<number> = [];

  missingArguments = false;
  wrongCharacter = false;

  courses: Array<Course> = [];
  selectedCourse: Course;

  professors: Array<Professor> = [];
  selectedProfessor: Professor;

  constructor(private postService: PostService,
              private getService: GetService,
              private router: RoutingService,
              private authService: AuthService,
              private angularFirestore: AngularFirestore) { }

  ngOnInit() {
    this.router.currentLocation('add-teaching');
    if(this.authService.isLoggednIn()) {

      this.getService.findAllCourses().subscribe(courses => {
        console.log(courses);
        this.courses = courses;
        this.getService.findAllProfessor().subscribe(professors => {
          this.professors = professors;
        });
      });
    }else{
      this.router.navigate('');
    }
  }

  fillVector() {
    for (let i = 0; i < this.selectedCourse.year; i++) {
      this.numbers.push(i + 1);
    }
    console.log(this.numbers);
    console.log(this.selectedCourse);
  }

  onSubmit() {

    this.missingArguments = (((this.name || this.description) == '') || (this.credits < 3 || this.credits > 18) ||
                                this.selectedCourse == null || this.selectedProfessor == null || this.semester == 0);
    this.wrongCharacter = (this.credits < 3 || this.credits > 18);

    if (!this.missingArguments && ! this.wrongCharacter) {

      const teaching: Module = {
        title: this.name,
        credits: this.credits,
        professor: this.selectedProfessor,
        course: this.selectedCourse,
        semester: this.semester,
        year: this.year
      };

      this.postService.saveModule(teaching).subscribe(teaching => {
        console.log(teaching);
        let chat = {
          chatId: teaching.moduleId,
          chatName: teaching.title,
          chatType: 'Public',
          courseId: teaching.course.courseId,
          moudleId: teaching.moduleId
        };
        this.angularFirestore.collection('chat').doc('kmrVt4jEZwOltgE9sNvR').
        collection('privateChat').add(chat).then(ret=>{
          console.log(ret);
          let firstMessg = {
            chatId: chat.chatId,
            chatType: chat.chatType,
            date: new Date(),
            message: 'first message',
            senderType: 'system',
          };
          this.angularFirestore.collection('modules').doc(''+chat.chatId).collection('chat')
            .add(firstMessg).then(ret=>{
            console.log(ret);
            let firstNotification = {
              message: 'first notification',
              moduleId: chat.moudleId,
              ans: 'init notification'
            };
            this.angularFirestore.collection('modules').doc(''+chat.chatId).collection('notifications')
              .add(firstNotification).then(ret=>{
               console.log(ret);
            });
          });
        });
        if (teaching != null) {
          this.router.navigate('seg-home');
        }
      });

    }

  }

}
