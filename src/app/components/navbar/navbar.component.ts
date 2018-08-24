import { Component, OnInit } from '@angular/core';
import {RoutingService} from "../../servicies/routing.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: RoutingService) { }

  ngOnInit() {
  }

  goBack(){
    let url = this.router.getPreviousUrl();
    this.router.removeLast();
    this.router.navigate(url);

  }

}
