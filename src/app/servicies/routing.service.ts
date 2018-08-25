import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  private history = [];

  constructor(private router: Router) { }

  public loadUrl(url: string){
    this.history.push(url);
  }

  public getHistory(): string[] {
    return this.history;
  }

  public removeLast(){
    this.history.pop()
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '';
  }

  public navigate(url: string){
    this.router.navigate([url]);
  }

}
