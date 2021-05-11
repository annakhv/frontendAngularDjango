import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, FormBuilder} from '@angular/forms';
import {HomepostsService} from '../homeposts.service'
import {ActivatedRoute, Router} from '@angular/router';





@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.css']
})
export class AnswerQuestionComponent implements OnInit {
  public errorMsg;
  username:string;
  answersObject:Array<Map<string,string>>;
  questionInfo:any;
  answers: Array<Map<string,string>>;
  @Input() public  displayAnswerForm;
  @Input() public questionForAnswer;
  @Input() public questionId;
  @Output() public change: EventEmitter<string> =new EventEmitter()
  @Output() public answerAdded: EventEmitter<boolean>=new EventEmitter()
  constructor(private _Router: Router, private route: ActivatedRoute, private postsService:HomepostsService, private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.username=this.route.snapshot.paramMap.get('username')

    
  }

  
  answerForm=this.fb.group({
    answerText:new FormControl("")
  })

  submitAnswer(){
    const answer=this.answerForm.value;
    this.answerForm.reset()
    this.postsService.answerQuestion(this.username, this.questionId, answer)
    .subscribe((responce)=>{
      if (responce.res === true){
         this.answerAdded.emit(true)
      }
    }, error=>this.errorMsg=error)
  }
 


  close(){
      this.displayAnswerForm ='d-none'
     // console.log(this.change.emit(this.displayAnswerForm))
      this.change.emit(this.displayAnswerForm);
    
  }
}
