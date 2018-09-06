import { Component, OnInit } from '@angular/core';
import {Course} from '../../../models/Course';
import {PutService} from '../../../../servicies/put.service';
import {GetService} from '../../../../servicies/get.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-modify-course',
  templateUrl: './modify-course.component.html',
  styleUrls: ['./modify-course.component.css']
})
export class ModifyCourseComponent implements OnInit {

  courses: Array<Course> = [];
  editCourseForm: FormGroup;
  selectedType;
  selectedCourse: Course;

  studyCourseTypes = [
    {courseType: 'BACHELOR', cfu: 180, year: 3},
    {courseType: 'MASTER', cfu: 120, year: 2},
    {courseType: 'ALL_IN_ONE_CYCLE_MASTER', cfu: 300, year: 5}
  ];

  constructor(private putService: PutService, private getService: GetService,
              private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.getService.findAllCourses().subscribe(courses => {
      this.courses = courses;
    });

    this.editCourseForm = this.formBuilder.group({
      course: null,
      description: null,
      type: null
    });

    this.editCourseForm.controls['course'].valueChanges.subscribe(
      value => {
        this.editCourseForm.controls['description'].setValue(value.description);
        this.editCourseForm.controls['type'].setValue(value.courseType);
      }
    );

    this.editCourseForm.controls['type'].valueChanges.subscribe(
      value => {
        switch (value) {
          default: {
            this.selectedType = 0;
            break;
          }
          case 'BACHELOR': {
            this.selectedType = 0;
            break;
          }
          case 'MASTER': {
            this.selectedType = 1;
            break;
          }
          case 'ALL_IN_ONE_CYCLE_MASTER': {
            this.selectedType = 2;
            break;
          }
        }
      }
    );

  }


  onSubmitForm() {
    this.selectedCourse = this.editCourseForm.controls['course'].value;
    this.selectedCourse.description = this.editCourseForm.controls['description'].value;
    this.selectedCourse.courseType = this.studyCourseTypes[this.selectedType].courseType;
    this.selectedCourse.cfu = this.studyCourseTypes[this.selectedType].cfu;
    this.selectedCourse.year = this.studyCourseTypes[this.selectedType].year;
    console.log(this.selectedCourse);

    this.putService.updateCourse(this.selectedCourse).subscribe( course => {
      if (course != null) {
        this.router.navigate(['seg-home']);
      }
    });
  }

}
