import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../../servicies/post.service";
import {Person} from "../../../models/Person";
import {GetService} from "../../../../servicies/get.service";
import {Course} from "../../../models/Course";
import {Student} from "../../../models/Student";
import {Professor} from "../../../models/Professor";
import {Secretary} from "../../../models/Secretary";
import {RoutingService} from "../../../../servicies/routing.service";
import {AuthService} from '../../../../servicies/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';

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


  error: boolean = false;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  dateOfBirth: Date;
  address: string = '';
  gender: string = '';
  number: number;

  level = '';

  photo: any;

  levels = ['prima', 'seconda', 'ordinario', 'straordinario', 'ruolo'];

  courses : Array<Course> = [];

  constructor(private postService: PostService,
              private router: RoutingService,
              private getService: GetService,
              private authService: AuthService,
              private angularFireAuth: AngularFireAuth,
              private angularFiredatabase: AngularFireStorage,
              private angularFirestore: AngularFirestore) {}

  ngOnInit() {
    this.router.currentLocation('add-user');
    if(this.authService.isLoggednIn()) {

      this.getService.findAllCourses().subscribe(courses => {
        this.courses = courses;
      });
    }else{
      this.router.navigate('');
    }
  }

  submit(selectedUser: string, selectedCourse?: Course){

    if (this.checkData(selectedUser, selectedCourse)) {
      let person = this.newPerson();

      switch (selectedUser) {
        case "STUDENT":
          let student: Student;
          student = this.newStudent(person, selectedCourse);

          this.createNewFirebase(student.person.email, student.person.password).then(ret=>{
            console.log(ret);
            this.postService.saveStudent(student).subscribe(saved=>{
              console.log(saved);
              this.angularFiredatabase.storage.ref('images/' + saved.person.personId + '/firebase-ico.jpg').put(this.photo[0]).
              then(returned=> {
                console.log(returned);
              }).catch(err=>{
                console.log(err);
              });
              if (saved != null)
                this.router.navigate('seg-home');
            });
          });
          break;

        case "PROFESSOR":
          let professor: Professor;
          professor = this.newProfessor(person);
          this.selectedCourse = null;
          this.createNewFirebase(professor.person.email, professor.person.password).then(ret=>{
            console.log(ret);
            this.postService.saveProfessor(professor).subscribe(saved=>{
              let firstNotification = {
                title: 'notification init',
                ans: 'dala segreteria'
              };
              console.log(saved);
              console.log(saved.person);
              this.angularFirestore.collection('tickets').doc(''+saved.person.personId)
                .collection('notifications').add(firstNotification).then(ret=>{
                  console.log(ret);
              });
              if (saved != null)
                this.router.navigate('seg-home');
            });
          });
          break;

        case "SECRETARY":
          let secretary: Secretary;
          secretary = this.newSecretary(person);
          this.selectedCourse = null;
          this.postService.saveSecretary(secretary).subscribe(saved=>{
            if (saved != null)
              this.router.navigate('seg-home');
          });
          break;
      }

    }else{
      console.log("wrong data");
      this.error = true;
      this.selectedCourse = null;
    }
  }

  private checkData(selectedUser: string, selectedCourse: Course): boolean{

    if((this.firstName || this.lastName ||
      this.email || selectedUser || this.number || this.address || this.phone || this. dateOfBirth) == null) {
      return false
    }else{
      switch(selectedUser) {
        case 'STUDENT':
          return (selectedCourse) != null;

        case 'PROFESSOR':
          return (this.level) != null;

        case 'SECRETARY':
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
      course: course,
      person: person,
      registrationDate: new Date()
    }
  }

  private createNewFirebase(email: string, pass: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, pass)
  }

  private  newProfessor(person: Person): Professor{

    return {
      person: person,
      level: this.level,
      hireDate: new Date()
    }
  }

  private newSecretary(person: Person): Secretary{
    return {
      person: person,
      hireDate: new Date()
    };
  }

  private onUpload(file: any){
    this.photo = file;
  }

}
