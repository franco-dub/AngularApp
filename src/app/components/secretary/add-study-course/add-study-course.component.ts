import { Component, OnInit } from '@angular/core';
import {GetService} from "../../../servicies/get.service";
import {PostService} from "../../../servicies/post.service";
import {StudyCourse} from "../../models/StudyCourse";
import {StudyCourseType} from "../../models/StudyCourseType";
import {Router} from "@angular/router";
import {Teaching} from "../../models/Teaching";

@Component({
  selector: 'app-add-study-course',
  templateUrl: './add-study-course.component.html',
  styleUrls: ['./add-study-course.component.css']
})
export class AddStudyCourseComponent implements OnInit {

  studyCourse: StudyCourse;
  studyCourseType: StudyCourseType = {
    courseType: '',
    cfu: 0,
    year: 0

  };
  studyCourseTypes: StudyCourseType[] = [];

  teachings: Teaching[];
  selectedTeachings: Teaching[] = [{
    name: '',
    credits: 0,
    description: '',
    semester: 0
  }];
  teaching: Teaching;

  name: string = '';
  description: string = '';

  missingArguments: boolean;

  constructor(private getService:GetService,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.getService.getStudyCourseTypeList().subscribe(studyCourseTypes => {

      this.studyCourseTypes = studyCourseTypes;

      this.getService.getTeachings().subscribe(teachings =>{

        this.teachings = teachings;

      });

    });

  }

  addTeaching(){
    this.router.navigate(['add-teaching']);
  }

  getCreditValue(){
    let credits: number = 0;
    if(this.selectedTeachings.length != null){
      for(let credit of this.selectedTeachings){
        credits += credit.credits;
      }
    }
    return credits;
  }

  onSubmit(){
    this.missingArguments = ((this.name || this.description) == '' ||
                              this.selectedTeachings == null  ||
                              this.getCreditValue() < this.studyCourseType.cfu);

    if (!this.missingArguments) {
      this.studyCourse = {
        name: this.name,
        description: this.description,
        typeStudyCourse: this.studyCourseType,
        teachings: this.selectedTeachings


      };

      this.postService.saveStudyCourse(this.studyCourse).subscribe(returned => {
        this.router.navigate(['seg-home']);
      });

    }

  }

}
