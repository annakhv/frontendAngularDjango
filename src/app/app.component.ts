
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
  searcher:string;
 
  

  onActivate(ref){
 //   this.userInfo.user$.subscribe((data)=> console.log(data))//this doesnt help when refreshing page
  if(ref.route.component.name === 'MainComponent'){ 
    this.searcher=ref.route.snapshot.params['searcher']
    if (this.searcher === 'undefined'){
       console.log("undefined username, page refreshed")
       this.searcher=localStorage.getItem('searcher')
  
       this.router.navigate(['home', this.searcher])
       
    }else{
       localStorage.setItem('searcher', this.searcher)
     
      
    }

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
     this.userInfo.loggedOut(this.searcher)
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