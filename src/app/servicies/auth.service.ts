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

  getData(tokenName: string): any{
    return sessionStorage.getItem(tokenName);
  }

  logout() {

    sessionStorage.removeItem("token");

    this.router.navigate([""]);

  }

  deleteToken(){
    sessionStorage.removeItem("token");
    //this.router.navigate([""]);
  }

}
