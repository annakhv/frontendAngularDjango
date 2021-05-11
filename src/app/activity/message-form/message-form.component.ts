import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormBuilder} from '@angular/forms';
import { AllUserActivityService } from '../all-user-activity.service';
import {BehaviorSubject} from 'rxjs'


@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  message:string;
  public errorMsg;
  @Input() public displayMessageForm;
  @Input() public fromUser;
  @Output() public change: EventEmitter<string> =new EventEmitter()
  constructor(private activity:AllUserActivityService , private fb:FormBuilder) { }

  ngOnInit(): void {
    this.messageForm.controls['from'].setValue(this.fromUser)
    this.activity.toUser$.subscribe((data)=> this.messageForm.controls['to'].setValue(data))
    
  }
  

  messageForm=this.fb.group({
    from: new FormControl(""),
    to: new FormControl(""),
    messageTitle:new FormControl(""),
    messageText:new FormControl("")
  })


  submitMessage() {
    this.activity.sendMessage(this.messageForm.value)
    .subscribe((responce :any)=>{
       if (responce.res ===true){
          this.message=responce.message
   
       }else{
         this.message=responce.message //same logic  

       }
    },error=>this.errorMsg=error)
  }

  close(){
    this.displayMessageForm ='d-none'
   // console.log(this.change.emit(this.displayAnswerForm))
    this.change.emit(this.displayMessageForm);
  
}
}
