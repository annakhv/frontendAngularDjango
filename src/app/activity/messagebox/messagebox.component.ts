import { Component, OnInit } from '@angular/core';
import { AllUserActivityService } from '../all-user-activity.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent implements OnInit {
  username:string;
  userList: Array<any>;
  message:string;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private activity: AllUserActivityService) { }

  ngOnInit(): void {
    this.username=this.route.snapshot.paramMap.get('username')
    this.activeUsers(this.username)
  }

messageForm=this.fb.group({
  messageText:new FormControl("")
})
  
submitMessage(){

}

activeUsers(name){
  this.activity.getActiveUsers(name)
  .subscribe((responce: any)=>{
     if (responce.res === true){
        this.userList=JSON.parse(responce.json)
        for (let obj of this.userList){
            console.log(obj)
        }
      
     }else{
       this.message=responce.message
       console.log(this.message)
     }
  }
     
  )
    
}

sendMessage($event){
  console.log($event.target.data)
}
}
