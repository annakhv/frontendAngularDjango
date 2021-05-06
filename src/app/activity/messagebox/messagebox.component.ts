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
  inboxMessage:string;
  sentMessage:string;
  singleMessage: Map<string,string>
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


getInboxMessages(){
   this.activity.inBoxMessages(this.username)
   .subscribe((responce:any)=>{
     if (responce.res == true){
        this.inbox=JSON.parse(responce.json)
        console.log(this.inbox)
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
       console.log(this.sentMessages)
    }else{
        this.sentMessage=responce.message
        console.log(this.sentMessage)
    }
  })
}

getSpecificMessage($event){
   const id =$event.target.data
   console.log(id)
   this.activity.getTheMessage(id)
   .subscribe((responce : any)=>{
      if(responce.res === true){
          this.singleMessage=responce.singleMessage
          console.log(this.singleMessage)
      }else{
         this.singleMessageMessage=responce.message
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
