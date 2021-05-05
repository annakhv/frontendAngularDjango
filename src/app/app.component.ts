
import { Component } from '@angular/core';
import {UserinfoService} from './account/userinfo.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent  {
  constructor(private router: Router, private userInfo:UserinfoService ){}
  title = 'newform';
  dropdown='d-none';
  username:string;
 
  

  onActivate(ref){
    if(ref.route.component.name === 'MainComponent'){
    this.username=ref.route.snapshot.params['username']
    }
   
  }
  toggle(){
    if (this.dropdown === 'd-none'){
      this.dropdown ='visible'
    }else{
      this.dropdown ='d-none'
    }
  }

  logOut(){
     this.userInfo.loggedOut(this.username)
     .subscribe((responce:any)=>{
        if (responce.res === true){
          localStorage.removeItem('token')
        }else{
          "something is wrong"
          localStorage.removeItem('token')
        }
     })
     
    
  }

 
}