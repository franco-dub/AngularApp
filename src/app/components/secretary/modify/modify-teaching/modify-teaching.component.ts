import { Component, OnInit } from '@angular/core';
import { Module } from '../../../models/Module';
import { Course } from '../../../models/Course';
import { Professor } from '../../../models/Professor';
import { PutService } from '../../../../servicies/put.service';
import { GetService } from '../../../../servicies/get.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modify-teaching',
  templateUrl: './modify-teaching.component.html',
  styleUrls: ['./modify-teaching.component.css']
})
export class ModifyTeachingComponent implements OnInit {

  editModuleForm: FormGroup;

  selectedModule: Module = null;

  modules: Array<Module> = [];

  courses: Array<Course> = [];

  professors: Array<Professor> = [];

  title: string;
  credits?: number;
  semester?: number;
  year?: number;



  constructor(private putService: PutService, private getService: GetService,
              private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getService.findAllModule().subscribe(modules => {
      this.modules = modules;
    });

    this.getService.findAllCourses().subscribe(courses => {
      this.courses = courses;
    });

    this.getService.findAllProfessor().subscribe(professors => {
      this.professors = professors;
    });

    this.editModuleForm = this.formBuilder.group({
      module: null,
      course: null,
      professor: null,
      credits: null,
      semester: null,
      year: null
    });

    this.editModuleForm.controls['module'].valueChanges.subscribe(
      value => {
        this.editModuleForm.controls['course'].setValue(value.course.courseId);
        this.editModuleForm.controls['professor'].setValue(value.professor.professorId);
        this.editModuleForm.controls['credits'].setValue(value.credits);
        this.editModuleForm.controls['semester'].setValue(value.semester);
        this.editModuleForm.controls['year'].setValue(value.year);
      }
    );
  }

  onSubmitForm() {
    this.selectedModule = this.editModuleForm.controls['module'].value;
    this.selectedModule.course = this.courses.filter(
      course => course.courseId === this.editModuleForm.controls['course'].value)[0];
    this.selectedModule.professor = this.professors.filter(
      professor => professor.professorId === this.editModuleForm.controls['professor'].value)[0];
    this.selectedModule.credits = this.editModuleForm.controls['credits'].value;
    this.selectedModule.semester = this.editModuleForm.controls['semester'].value;
    this.selectedModule.year = this.editModuleForm.controls['year'].value;
    console.log(this.selectedModule);

    this.putService.updateModule(this.selectedModule).subscribe( module => {
      if (module != null) {
        this.router.navigate(['seg-home']);
      }
     });
  }

}
