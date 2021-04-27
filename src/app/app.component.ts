
import { Component ,  ViewChild, AfterViewInit} from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent  {
  constructor( ){}
  title = 'newform';
  dropdown='d-none';
  username:string;
 
  

  onActivate(ref){
    if(ref.route.component.name === 'MainComponent'){
    console.log("works")
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



 
}