import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormBuilder} from '@angular/forms';
import { AllUserActivityService } from '../all-user-activity.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  
  @Input() public displayMessageForm;
  @Output() public change: EventEmitter<string> =new EventEmitter()
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  

  messageForm=this.fb.group({
    messageText:new FormControl("")
  })


  submitMessage() {
  
  }

  close(){
    this.displayMessageForm ='d-none'
   // console.log(this.change.emit(this.displayAnswerForm))
    this.change.emit(this.displayMessageForm);
  
}
}
