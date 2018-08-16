import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-seg-home',
  templateUrl: './seg-home.component.html',
  styleUrls: ['./seg-home.component.css']
})
export class SegHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  private addAula(): void{
    this.router.navigate(["add-aula"]);
  }

  private addUser(): void{
    this.router.navigate(["add-user"]);
  }

  private addTeaching():void{
    this.router.navigate(["add-teaching"]);
  }

  private addStudyCourse(): void{
    this.router.navigate(["add-course"]);
  }

  private addCalendar(): void{
    this.router.navigate(["add-calendar"]);
  }

}
