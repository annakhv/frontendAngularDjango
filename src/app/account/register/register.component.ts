import { Component, OnInit } from '@angular/core';
import {userRegister} from './signin';
import {UserinfoService} from '../userinfo.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _UserinfoService : UserinfoService, private _Router: Router) { }

  ngOnInit(): void {
   
  }
  newuser=new userRegister('username', 'firstname', 'lastname', 'example@com', 'password', "password")
  warning:string;
  submitRegister() {
    console.log(this.newuser)
    try{
      this._UserinfoService.register(this.newuser)
        .subscribe((responce: any) =>{
          if(responce.message =='ok'){
          
            this._Router.navigate(['login'])
          }
          else{
              this.warning=responce.message
              this._Router.navigate(['registeruser'])
          }
           
          
        });
      }catch(err){
        console.log(err)
        this._Router.navigate(['registeruser'])
      }

  }

}
