import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../servicies/post.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {User} from "../../models/User";
import {GetService} from "../../../servicies/get.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {

  form: FormGroup;

  type: String[] = ['Student', 'Professor', 'Secretary'];


  selectedUser: string = "";

  selectedTeaching: number;

  selectedTCourse: number;

  selectedCourse: number;

  error: boolean = false;

  studyCourses = [{id: 1,
                name: "ingegneria"},
                {
                  id:4,
                  name: "economia"
                }];

  ingegneria = [{id: 1,
    name: "act"},
    {
      id:2,
      name: "software"
    }];

  economia = [{id: 0,
    name: "storia"},
    {
      id:2,
      name: "matematica"
    }];

  teachings = null;


  constructor(postService: PostService, formBuilder: FormBuilder, getService: GetService) {
    this.form = formBuilder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('')
    });
  }

  ngOnInit() {
    //TODO lista corsi di studio per studenti lista insegnamenti per docenti
  }

  submit(selectedUser: string, selectedCourse?: number, selectedTeaching?: number){

    if (this.checkData(selectedUser, selectedCourse, selectedTeaching)) {
      console.log("data correctly inserted");
      let newUser: User;

      switch (selectedUser) {
        case "Student":
          console.log(selectedUser + " " + selectedCourse);
          newUser = this.newStudent(selectedUser, selectedCourse);
          this.selectedTeaching = null;
          break;

        case "Professor":
          console.log(selectedUser + " " + selectedTeaching);
          newUser = this.newProfessor(selectedUser, selectedTeaching);
          this.selectedCourse = null;
          break;

        case "Secretary":
          newUser = this.newSecretary(selectedUser);
          this.selectedTeaching= null;
          this.selectedCourse = null;
          break;
      }

    }else{
      console.log("wrong data");
      this.error = true;
      this.selectedTeaching= null;
      this.selectedCourse = null;
    }

  }

  prova(){
    console.log(this.selectedTCourse);
    switch (this.selectedTCourse) {
      case this.studyCourses[0].id:
        this.teachings = this.ingegneria;
        break;

      case this.studyCourses[1].id:
        this.teachings = this.economia;
        break;

    }
  }

  private checkData(selectedUser: string, selectedCourse: number, selectedTeaching: number): boolean{

    if((this.form.get('firstName').value || this.form.get('lastName') ||
      this.form.get('email') || selectedUser) == null) {
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
    return "prova";
  }

  private newStudent(user: string, course: number): User{
    return {
      name: this.form.get('firstName').value,
      surname: this.form.get('lastName').value,
      email: this.form.get('email').value,
      type: user,
      password: this.password(),
      idStudyCourse: course
    }
  }

  private newProfessor(user: string, teaching: number): User{
    return {
      name: this.form.get('firstName').value,
      surname: this.form.get('lastName').value,
      email: this.form.get('email').value,
      type: user,
      password: this.password(),
      idTeaching: teaching
    }
  }

  private newSecretary(user: string): User{
    return {
      name: this.form.get('firstName').value,
      surname: this.form.get('lastName').value,
      email: this.form.get('email').value,
      type: user,
      password: this.password(),
    }
  }

}
