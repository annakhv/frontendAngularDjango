import { Component, OnInit} from '@angular/core';
import {userData} from './sign';
import {UserinfoService} from '../userinfo.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:ActivatedRoute ,private  _UserinfoService : UserinfoService, private _Router:Router) {  }

  ngOnInit(): void {
    
  }
  public user=new userData('username', 'password', false);
  warning: string;
  public errorMsg;
 
  
  onSubmit() {
      this._UserinfoService.logIn(this.user)
        .subscribe((responce: any) =>{
          if(responce.res === true){
           localStorage.setItem('token', responce.token)
           this._UserinfoService.user$.next(this.user.username)
           this._Router.navigate(['home/', this.user.username])
          }else{
              this.warning="user credentials are not correct"
              this._Router.navigate(['login/' ])
          }
           
        },error=>this.errorMsg=error);

        

  }


 
}

