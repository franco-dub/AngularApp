import { Component, OnInit } from '@angular/core';
import {Course} from '../../../models/Course';
import {GetService} from '../../../../servicies/get.service';
import {Student} from '../../../models/Student';
import {Professor} from '../../../models/Professor';
import {Secretary} from '../../../models/Secretary';
import {PutService} from '../../../../servicies/put.service';
import {RoutingService} from '../../../../servicies/routing.service';
import {AuthService} from '../../../../servicies/auth.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  gends = ['M', 'F'];

  type: String[] = ['STUDENTE', 'PROFESSORE', 'SEGRETARIO'];

  selectedType = '';

  selectedCourse: Course;

  error = false;

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  dateOfBirth: Date;
  address = '';
  gender = '';
  number: number;

  photo: any;

  hireDate: Date = null;

  courses: Array<Course> = [];

  student: Student = null;

  professor: Professor = null;

  secretary: Secretary = null;

  persons: Array<any> = null;

  selectedPerson: any = null;

  courseName = '';

  password = '';

  endEngagement: Date = null;

  constructor(private getService: GetService,
              private putService: PutService,
              private router: RoutingService,
              private authService: AuthService,
              private angularFiredatabase: AngularFireStorage) { }

  ngOnInit() {
    this.router.currentLocation('modify-user');
    if(!this.authService.isLoggednIn()){
      this.router.navigate('');
    }
  }

  findPersons() {
    switch (this.selectedType) {
      case this.type[0]:
        this.student = null;
        this.professor = null;
        this.secretary = null;
        this.getService.findAllStudent().subscribe(student => {
          this.persons = student;
        });
        break;

      case this.type[1]:
        this.student = null;
        this.professor = null;
        this.secretary = null;
        this.getService.findAllProfessor().subscribe(professor => {
          this.persons = professor;
        });
        break;

      case this.type[2]:
        this.student = null;
        this.professor = null;
        this.secretary = null;
        this.getService.findAllSecretary().subscribe(secretary => {
          this.persons = secretary;
        });
        break;
    }

  }

  populateData() {
    //const splitter = this.selectedPerson.person.address.split(' n° ');
    //this.address = splitter[0];
    //this.number = parseInt(splitter[1], 10);

    if (this.selectedPerson.professorId != null) {
      this.professor = this.selectedPerson;
      this.firstName = this.professor.person.firstName;
      this.lastName = this.professor.person.lastName;
      this.phone = this.professor.person.phone;
      this.email = this.professor.person.email;
      this.dateOfBirth = this.professor.person.dateOfBirth;
      this.password = this.professor.person.password;
      this.hireDate = this.professor.hireDate;
      this.gender = this.professor.person.gender.toUpperCase();

    } else if (this.selectedPerson.studentId != null) {
      this.getService.findAllCourses().subscribe(courses => {
        this.courses = courses;

      });
      this.student = this.selectedPerson;
      this.firstName = this.student.person.firstName;
      this.lastName = this.student.person.lastName;
      this.phone = this.student.person.phone;
      this.email = this.student.person.email;
      this.dateOfBirth = this.student.person.dateOfBirth;
      this.gender = this.student.person.gender.toUpperCase();
      this.password = this.student.person.password;
      this.selectedCourse = this.student.course;
      this.courseName = this.selectedCourse.name;

    } else if (this.selectedPerson.secretaryId != null) {
      this.secretary = this.selectedPerson;
      this.firstName = this.secretary.person.firstName;
      this.lastName = this.secretary.person.lastName;
      this.phone = this.secretary.person.phone;
      this.email = this.secretary.person.email;
      this.hireDate = this.secretary.hireDate;
      this.password = this.secretary.person.password;
      this.dateOfBirth = this.secretary.person.dateOfBirth;
      this.gender = this.secretary.person.gender.toUpperCase();
    }
  }

  private checkData(): boolean {
    return (this.firstName && this.lastName &&
      this.email && this.number.toString() && this.address && this.phone && this. dateOfBirth.toDateString()) != '';
  }

  submit(photo: any) {

    this.photo = photo;

    if(this.authService.isLoggednIn()) {

      if (this.checkData()) {

        switch (this.selectedType) {
          case 'STUDENT':
            const address = this.address + ' n° ' + this.number;
            this.student.person.firstName = this.firstName;
            this.student.person.lastName = this.lastName;
            this.student.person.gender = this.gender;
            this.student.person.phone = this.phone;
            this.student.person.email = this.email;
            this.student.person.dateOfBirth = this.dateOfBirth;
            this.student.person.address = address;
            this.student.person.password = this.password;
            for (const course of this.courses) {
              if (course.name == this.courseName) {
                this.student.course = course;
              }
            }
            this.angularFiredatabase.storage.ref('images/' + this.student.person.personId + '/firebase-ico.jpg').put(this.photo[0]).
              then(returned=> {
                console.log(returned);
              }).catch(err=>{
                console.log(err);
              });
            this.putService.updateStudent(this.student).subscribe(student => {
              if (student != null) {
                this.router.navigate('seg-home');
              }
            });
            break;

          case 'PROFESSOR':
            this.professor.person.firstName = this.firstName;
            this.professor.person.lastName = this.lastName;
            this.professor.person.gender = this.gender;
            this.professor.person.phone = this.phone;
            this.professor.person.email = this.email;
            this.professor.person.dateOfBirth = this.dateOfBirth;
            this.professor.person.password = this.password;
            this.professor.person.address = this.address;
            this.professor.endEngagement = this.endEngagement;
            this.angularFiredatabase.storage.ref('images/' + this.professor.person.personId + '/firebase-ico.jpg').put(this.photo[0]).
              then(returned=> {
                console.log(returned);
              }).catch(err=>{
                console.log(err);
              });
            this.putService.updateProfessor(this.professor).subscribe(professor => {
              if (professor != null) {
                this.router.navigate('seg-home');
              }
            });

            break;

          case 'SECRETARY':
            this.secretary.person.firstName = this.firstName;
            this.secretary.person.lastName = this.lastName;
            this.secretary.person.gender = this.gender;
            this.secretary.person.phone = this.phone;
            this.secretary.person.email = this.email;
            this.secretary.person.dateOfBirth = this.dateOfBirth;
            this.secretary.person.password = this.password;
            this.secretary.person.address = this.address;
            this.secretary.endEngagement = this.endEngagement;
            this.putService.updateSecretary(this.secretary).subscribe(secretary => {
              if (secretary != null) {
                this.router.navigate('seg-home');
              }
            });
            break;
        }

      } else {
        console.log('wrong data');
        this.error = true;
        this.selectedCourse = null;
      }
    }else{
      this.authService.toast('Not logged in');
    }
  }

  newPassword() {
    this.password = 'password';
  }

}
