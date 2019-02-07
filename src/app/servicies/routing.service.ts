import { Injectable } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {Observable, Subject, Subscriber} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  private history = [];
  private currentUrlObs =  new Subject<string>();
  private currentUrl: string;

  constructor(private router: Router, private authService: AuthService) { }

  public currentLocation(url: string){
    this.currentUrl = url;
    this.currentUrlObs.next(url);
  }

  public getCurrentLocation(): Observable<string>{
    return this.currentUrlObs.asObservable();
  }

  public backUrl(url: string){
    if(this.authService.isLoggednIn()) {
      switch (url) {
        case 'add-aula':
          this.navigate('seg-home');
          break;

        case 'add-calendar':
          this.navigate('seg-home');
          break;

        case 'add-user':
          this.navigate('seg-home');
          break;

        case 'add-course':
          this.navigate('seg-home');
          break;

        case 'add-teaching':
          this.navigate('seg-home');
          break;

        case 'modify-aula':
          this.navigate('seg-home');
          break;

        case 'modify-teaching':
          this.navigate('seg-home');
          break;

        case 'modify-course':
          this.navigate('seg-home');
          break;

        case 'modify-user':
          this.navigate('seg-home');
          break;

        case 'modify-calendar':
          this.navigate('seg-home');
          break;

        default:
          this.navigate('');
          this.authService.logout();
          break;

      }
    }else{
      this.navigate('');
      this.authService.logout();
    }
  }

  public navigate(url: string, extras?: NavigationExtras){
    this.router.navigate([url], extras);
  }

}
