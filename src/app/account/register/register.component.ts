import { Component, OnInit } from '@angular/core';
import {userRegister} from './signin';
import {UserinfoService} from '../userinfo.service'
import {Router} from '@angular/router'
import {EqualValidatorDirective} from '../equal-validator.directive'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMsg:string;
  constructor(private _UserinfoService : UserinfoService, private _Router: Router) { }

  ngOnInit(): void {
   
  }
  newuser=new userRegister('username', 'firstname', 'lastname', 'example@mail.com', 'password1', "password1")
  warning:string;
  submitRegister() {
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
        this.errorMsg=err
        this._Router.navigate(['registeruser'])
      }

  }

}
