import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../servicies/post.service";
import {FormBuilder} from "@angular/forms";
import {Person} from "../../models/Person";
import {GetService} from "../../../servicies/get.service";
import {Course} from "../../models/Course";
import {Student} from "../../models/Student";
import {Professor} from "../../models/Professor";
import {Secretary} from "../../models/Secretary";
import {Module} from "../../models/Module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  gends = ['M', 'F'];

  type: String[] = ['STUDENT', 'PROFESSOR', 'SECRETARY'];

  selectedUser: string = "";

  selectedCourse: Course;

  selectedModule: Module;

  error: boolean = false;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  dateOfBirth: Date;
  address: string = '';
  gender: string = '';
  number: number;

  courses : Array<Course> = [];

  modules: Array<Module> = [];

  constructor(private postService: PostService, private router: Router, private getService: GetService) {}

  ngOnInit() {
    this.getService.findAllCourses().subscribe(courses =>{
      this.courses = courses;
    });
  }

  findAllModuleByCourse(){
    this.getService.findAllModulesByCourse(this.selectedCourse).subscribe(modules=>{
      this.modules = modules;
    });
  }

  submit(selectedUser: string, selectedCourse?: Course, selectedTeaching?: Module){

    if (this.checkData(selectedUser, selectedCourse, selectedTeaching)) {
      let person = this.newPerson();

      switch (selectedUser) {
        case "STUDENT":
          let student: Student;
          student = this.newStudent(person, selectedCourse);
          console.log(student);
          this.postService.saveStudent(student).subscribe(saved=>{
            if (saved != null)
              this.router.navigate(['seg-home']);
          });
          break;

        case "PROFESSOR":
          let professor: Professor;
          console.log(selectedUser + " " + selectedTeaching);
          professor = this.newProfessor(person, selectedTeaching);
          this.selectedCourse = null;
          this.postService.saveProfessor(professor).subscribe(saved=>{
            if (saved != null)
              this.router.navigate(['seg-home']);
          });
          break;

        case "SECRETARY":
          let secretary: Secretary;
          secretary = this.newSecretary(person);
          this.selectedCourse = null;
          this.postService.saveSecretary(secretary).subscribe(saved=>{
            if (saved != null)
              this.router.navigate(['seg-home']);
          });
          break;
      }

    }else{
      console.log("wrong data");
      this.error = true;
      this.selectedCourse = null;
    }
  }

  private checkData(selectedUser: string, selectedCourse: Course, selectedTeaching: Module): boolean{

    if((this.firstName || this.lastName ||
      this.email || selectedUser || this.number || this.address || this.phone || this. dateOfBirth) == null) {
      return false
    }else{
      if(selectedUser != "Secretary") {
        return (selectedCourse || selectedTeaching) != null;
      }else{
        return true;
      }
    }
  }

  private password(): string{
    return "password";
  }

  private newPerson(): Person{
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender.toLowerCase(),
      address: this.address + " n° " + this.number,
      password: this.password(),
    };
  }

  private newStudent(person: Person, course: Course): Student{

    return {
      courseDto: course,
      personDto: person,
      registrationDate: new Date()
    }
  }

  private  newProfessor(person: Person, teaching: Module): Professor{

    return {
      person: person,
      level: 'first',
      hireDate: new Date()
    }
  }

  private newSecretary(person: Person): Secretary{
    return {
      person: person,
      hireDate: new Date()
    };
  }

}
