import { Component, OnInit } from '@angular/core';
import {userData} from './sign'
import {UserinfoService} from '../userinfo.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _UserinfoService : UserinfoService, private _Router:Router) {  }

  ngOnInit(): void {
  }
  user=new userData('username', 'password', false)
  warning: string;
  getProfileData(user) {
    this._UserinfoService.profile(user)
       .subscribe((responce: any)=>{
          if(responce.res === true ){
            console.log('profile works')
          }

       })  

 }
  onSubmit() {
    console.log(this.user)
      this._UserinfoService.logIn(this.user)
        .subscribe((responce: any) =>{
          if(responce.res === true){
           localStorage.setItem('token', responce.token)
            this.getProfileData(this.user);
            this._Router.navigate(['profile/', this.user.username])
          }else{
              this.warning="user credentials are not correct"
              this._Router.navigate(['login'])
          }
           
        });

  }

 
}

