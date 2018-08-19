import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }


  sendToken(token: any, tokenName:string) {

    sessionStorage.setItem(tokenName, token);

  }

  getToken(tokenName: string) {

    return sessionStorage.getItem(tokenName);

  }

  isLoggednIn() {

    return this.getToken('token') !== null;

  }

  logout() {

    sessionStorage.removeItem("token");

    this.router.navigate([""]);

  }

  expireToken(){
    sessionStorage.removeItem("token");
    this.router.navigate([""]);
  }

}
