import { Component, OnInit } from '@angular/core';
import {RoutingService} from "../../servicies/routing.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  canGoBack= '';

  constructor(private router: RoutingService) {

  }

  ngOnInit() {
    this.router.getCurrentLocation().subscribe(back=>{
      this.canGoBack = back;
      console.log(back);
    });
  }

  goBack(){
    this.router.backUrl(this.canGoBack);
  }

}
