import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../../servicies/post.service';
import {Module} from '../../../models/Module';
import {GetService} from '../../../../servicies/get.service';
import {Course} from '../../../models/Course';
import {Professor} from '../../../models/Professor';
import {Router} from '@angular/router';
import {RoutingService} from '../../../../servicies/routing.service';

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
              private router: RoutingService) { }

  ngOnInit() {
    if (this.router.getHistory()[this.router.getHistory().length - 1] != 'add-teaching') {
    this.router.loadUrl('add-teaching');
    }

    this.getService.findAllCourses().subscribe(courses => {
      console.log(courses);
      this.courses = courses;
      this.getService.findAllProfessor().subscribe(professors => {
        this.professors = professors;
      });
    });
  }

  fillVector() {
    for (let i = 0; i < this.selectedCourse.year; i++) {
      this.numbers.push(i + 1);
    }
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
        if (teaching != null) {
          this.router.navigate('seg-home');
        }
      });

    }

  }

}
