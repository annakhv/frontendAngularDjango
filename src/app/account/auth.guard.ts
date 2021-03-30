import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserinfoService} from './userinfo.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _UserinfoService : UserinfoService, private _Router: Router){}
  
canActivate(): boolean{
  if (this._UserinfoService.loggedIn()){
    return true
  }else{
    this._Router.navigate(['login'])
    return false
  }
}
}
