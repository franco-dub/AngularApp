import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../../servicies/post.service";
import {Module} from "../../../models/Module";
import {GetService} from "../../../../servicies/get.service";
import {Course} from "../../../models/Course";
import {Professor} from "../../../models/Professor";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-teaching',
  templateUrl: './add-teaching.component.html',
  styleUrls: ['./add-teaching.component.css']
})
export class AddTeachingComponent implements OnInit {


  teaching: Module;

  name: string = '';
  credits: number = 0;
  description: string = '';
  semester: number = 0;
  year: number = 0;

  numbers: Array<number> = [];

  missingArguments: boolean = false;
  wrongCharacter: boolean = false;

  courses: Array<Course> = [];
  selectedCourse: Course;

  professors: Array<Professor> = [];
  selectedProfessor: Professor;

  constructor(private postService: PostService,
              private getService: GetService,
              private router: Router) { }

  ngOnInit() {
    this.getService.findAllCourses().subscribe(courses =>{
      console.log(courses);
      this.courses = courses;
      this.getService.findAllProfessor().subscribe(professors=>{
        this.professors = professors;
      });
    });
  }

  fillVector(){
    for(let i = 0; i < this.selectedCourse.year; i++){
      this.numbers.push(i + 1);
    }
  }

  onSubmit(){

    this.missingArguments = (((this.name || this.description) == '') || (this.credits < 3 || this.credits > 18) ||
                                this.selectedCourse == null || this.selectedProfessor == null || this.semester == 0);
    this.wrongCharacter = (this.credits < 3 || this.credits > 18);

    if (!this.missingArguments && ! this.wrongCharacter){

      let teaching: Module = {
        title: this.name,
        credits: this.credits,
        professor: this.selectedProfessor,
        course: this.selectedCourse,
        semester: this.semester,
        year: this.year
      };

      this.postService.saveModule(teaching).subscribe(teaching => {
        console.log(teaching);
        if(teaching != null)
          this.router.navigate(['seg-home']);
      });

    }

  }

}
