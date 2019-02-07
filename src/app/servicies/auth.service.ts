import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private snackBar: MatSnackBar) { }


  sendToken(token: any, tokenName:string) {
    sessionStorage.setItem(tokenName, JSON.stringify(token));
  }

  getToken(tokenName: string) {
    return sessionStorage.getItem(tokenName);
  }

  isLoggednIn() {
    return this.getToken('token') != null;
    //return true;
  }

  getLoggedUser(tokenName: string): any{
    return JSON.parse(sessionStorage.getItem(tokenName));
  }

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem('user');
  }

  toast(message: string){
    this.snackBar.open(message, '', {duration: 2000});
  }

}
