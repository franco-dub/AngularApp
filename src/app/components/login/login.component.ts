import { Component, OnInit } from '@angular/core';
import { Login } from "../models/Login";
import { GetService } from "../../servicies/get.service";
import { Router } from "@angular/router";
import {Professor} from "../models/Professor";
import {Secretary} from "../models/Secretary";
import {AuthService} from "../../servicies/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login= {email: "",
                password: "",
                hide: false};

  errorLog: string = "";

  professor: Professor;

  secretary: Secretary;

  constructor(private getService: GetService, private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  login(email, password) {

    this.user.email = email;
    this.user.password = password;

    this.getService.login(this.user).subscribe(loggedUser => {

      console.log(loggedUser);

      if(loggedUser!= null) {

        this.user.hide = false;

        switch (loggedUser.type) {

          case "SECRETARY":
            console.log("ok il prezzo è giusto");
            this.secretary = loggedUser.secretary;
            this.authService.sendToken('loggedSecretary', 'token');
            this.authService.sendToken(this.secretary, 'user');
            this.router.navigate(["seg-home"], {queryParams: {user: this.secretary}});
            break;

          case "PROFESSOR":
            console.log("ok il prezzo è giusto professore");
            this.professor = loggedUser.professor;
            this.authService.sendToken('loggedProfessor', 'token');
            this.authService.sendToken(this.professor, 'user');
            this.router.navigate(["seg-home"]);
            break;

          case "STUDENT":
            this.errorLog = "Student can\'t login from website";
            this.user.hide = true;
            break;

          default:
            this.errorLog = "Wrong email or password";
            this.user.hide = true;
            break;
        }

      }else {
        this.errorLog = "Wrong email or password";
        this.user.hide = true;
      }

    });

  }

}
