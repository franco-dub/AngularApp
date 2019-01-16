import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import { BehaviorSubject } from 'rxjs';
import { Professor } from '../components/models/Professor';
import { Token, tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSource = new BehaviorSubject<any>("default user");
  currentUser = this.userSource.asObservable();

  constructor(private router: Router) { }

  changeMessage(loggedUser){
    this.userSource.next(loggedUser)
  }


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
