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
  public errorMsg;
  inboxvisibility:string;
  sentboxvisibility:string;
  theMessageinvisibility:string;
  searcher:string;
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
    
    this.searcher=this.route.snapshot.paramMap.get('searcher')
    this.displayMessageForm='d-none'
    this.activeUsers(this.searcher)
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
  },error=>this.errorMsg=error )
    
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
   this.activity.inBoxMessages(this.searcher)
   .subscribe((responce:any)=>{
     if (responce.res == true){
        this.inbox=JSON.parse(responce.json)
       
     }else{
         this.inboxMessage=responce.message
         console.log(this.inboxMessage)
     }
   },error=>this.errorMsg=error)
}

getSentMessages(){
  this.activity.sentMessages(this.searcher)
  .subscribe((responce:any)=>{
    if (responce.res == true){
       this.sentMessages=JSON.parse(responce.json)

    }else{
        this.sentMessage=responce.message
        console.log(this.sentMessage)
    }
  },error=>this.errorMsg=error)
 
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
   },error=>this.errorMsg=error)
}


delete($event){
  const id=$event.target.data
  this.activity.deleteMessage(this.searcher, id)
  .subscribe((responce :any)=>{
     if(responce.res === true){
       console.log("message deleted successfully")
     }
     else{
       console.log("message is not deleted")
     }
  },error=>this.errorMsg=error)

}
}
