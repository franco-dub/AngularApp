import { Component, OnInit } from '@angular/core';
import {GetService} from "../../../../servicies/get.service";
import {PostService} from "../../../../servicies/post.service";
import {Router} from "@angular/router";
import {Course} from "../../../models/Course";
import {RoutingService} from "../../../../servicies/routing.service";

@Component({
  selector: 'app-add-study-course',
  templateUrl: './add-study-course.component.html',
  styleUrls: ['./add-study-course.component.css']
})
export class AddStudyCourseComponent implements OnInit {

  studyCourse: Course;
  studyCourseType = {
    courseType: '',
    cfu: 0,
    year: 0

  };
  studyCourseTypes = [
    {courseType: 'BACHELOR', cfu: 180, year: 3},
    {courseType: 'MASTER', cfu: 120, year: 2},
    {courseType: 'ALL_IN_ONE_CYCLE_MASTER', cfu: 300, year: 5}
    ];

  name: string = '';
  description: string = '';

  missingArguments: boolean;

  constructor(private getService: GetService,
              private postService: PostService,
              private router: RoutingService) { }

  ngOnInit() {
    if(this.router.getHistory()[this.router.getHistory().length - 1] != 'add-course') {
      this.router.loadUrl('add-course');
    }
  }

  onSubmit(){
    this.missingArguments = ((this.name || this.description) == '');

    if (!this.missingArguments) {
      this.studyCourse = {
        name: this.name,
        description: this.description,
        courseType: this.studyCourseType.courseType,
        cfu: this.studyCourseType.cfu,
        year: this.studyCourseType.year,
      };

      this.postService.saveCourse(this.studyCourse).subscribe(returned => {
        if(returned != null) {
          this.router.navigate('seg-home');
        }
      });

    }

  }

}
