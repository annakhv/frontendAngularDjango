import { Component, OnInit } from '@angular/core';
import { AllUserActivityService } from '../all-user-activity.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {BehaviorSubject} from 'rxjs'


@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.css']
})
export class MessageboxComponent implements OnInit {
  inboxvisibility:string;
  sentboxvisibility:string;
  theMessageinvisibility:string;
  username:string;
  userList: Array<any>;
  message:string;
  inboxMessage:string;
  sentMessage:string;
  theMessage:any;
  singleMessageMessage:string;
  inbox: Array<Map<string,string>>
  sentMessages:  Array<Map<string,string>>
  displayMessageForm:string;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private activity: AllUserActivityService) { }

  ngOnInit(): void {
    
    this.username=this.route.snapshot.paramMap.get('username')
    this.displayMessageForm='d-none'
    this.activeUsers(this.username)
    this.getInboxMessages()
    this.getSentMessages()
    this.inboxvisibility='visible'
    this.sentboxvisibility='d-none'
    this.theMessageinvisibility='d-none'

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
  this.displayMessageForm="visible"
  this.activity.toUser$.next($event.target.data)

}

showinbox(){
  this.inboxvisibility='visible'
  this.sentboxvisibility='d-none'
  this.theMessageinvisibility='d-none'
}
showsendbox(){
  this.inboxvisibility='d-none'
  this.sentboxvisibility='visible'
  this.theMessageinvisibility='d-none'
}


getInboxMessages(){
   this.activity.inBoxMessages(this.username)
   .subscribe((responce:any)=>{
     if (responce.res == true){
        this.inbox=JSON.parse(responce.json)
       
     }else{
         this.inboxMessage=responce.message
         console.log(this.inboxMessage)
     }
   })
}

getSentMessages(){
  this.activity.sentMessages(this.username)
  .subscribe((responce:any)=>{
    if (responce.res == true){
       this.sentMessages=JSON.parse(responce.json)

    }else{
        this.sentMessage=responce.message
        console.log(this.sentMessage)
    }
  })
 
}

messageVisibility() {
  console.log("visibility check")
  this.inboxvisibility='d-none';
  this.sentboxvisibility='d-none';
  this.theMessageinvisibility='visible';
}
getSpecificMessage($event){
   const id =$event.target.data
   console.log(id)
   this.activity.getTheMessage(id)
   .subscribe((responce : any)=>{
      if(responce.res === true){
          this.theMessage=responce.single
          this.messageVisibility()
         
      }else{
         this.singleMessageMessage=responce.message
         this.messageVisibility()
      }
   })
}


delete($event){
  const id=$event.target.data
  this.activity.deleteMessage(this.username, id)
  .subscribe((responce :any)=>{
     if(responce.res === true){
       console.log("message deleted successfully")
     }
     else{
       console.log("message is not deleted")
     }
  })

}
}
