import { Component, OnInit } from '@angular/core';
import { Login } from "../models/Login";
import { GetService } from "../../servicies/get.service";
import { User } from "../models/User";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login= {email: "",
                password: "",
                hide: false};

  loggedUser: User;
  errorLog: string = "";

  constructor(private getService: GetService, private router: Router) { }

  ngOnInit() { }

  login(email, password) {

    this.user.email = email;
    this.user.password = password;

    this.getService.login(this.user).subscribe(loggedUser => {

      this.loggedUser = loggedUser;

      if(this.loggedUser!= null) {

        this.user.hide = false;
        console.log(this.loggedUser.type);

        switch (this.loggedUser.type) {

          case "Segretario":
            console.log("ok il prezzo è giusto");
            this.router.navigate(["seg-home"]);
            break;

          case "Docente":
            console.log("ok il prezzo è giusto");
            break;

          case "Studente":
            this.errorLog = "Student can\'t login from website";
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
