import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {HomepostsService} from '../homeposts.service'
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
   username:string;
   result: Array<any>;
   questions: Array<string>;
   displayAnswerForm:string;
   questionId:string;
   questionForAnswer:string;
   messageSubmitQuestion:string;
   answersObject:Array<any>
  constructor(private _Router: Router, private route: ActivatedRoute,private postsService:HomepostsService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.username=this.route.snapshot.paramMap.get('username' )
    this.displayAnswerForm='d-none'
    this.getQuestions()
    this.getAnswers()
  }

  questionForm=this.fb.group({
    questionText:new FormControl("")
  })

  answerForm=this.fb.group({
    answerText:new FormControl("")
  })


submitQuestion(){
   const question=this.questionForm.value
   this.questionForm.reset();
   console.log(question)
   this.postsService.askQuestion(this.username, question)
   .subscribe((responce=>{
     if (responce.res === true){
       this.messageSubmitQuestion=responce.question
       this.getQuestions()
       console.log("question has been submitted")
     }else{
       this.messageSubmitQuestion=responce.question
     }
   }))

}
getAnswers(){
  this.postsService.getAnswersWithComments(this.username)
  .subscribe((responce=>{
     if(responce.res === true){
       this.answersObject =responce.json
       console.log(this.answersObject)
     }
  }))
}


getQuestions(){
  this.postsService.getQuestions(this.username)
    .subscribe((responce=>{
      if (responce.res === true){
        this.result=JSON.parse(responce.json)
        this.questions=Object.keys(this.result)
      }else{
         console.log("error")
      }
    }
      ))
}

submitAnswer(){
  const answer=this.answerForm.value;
  this.answerForm.reset()
  this.postsService.answerQuestion(this.username, this.questionId, answer)
  .subscribe((responce=>{
    if (responce.res === true){
      this.getAnswers()
       console.log(responce.message)
    }
  }))
}


displayAnswerField($event){
  this.questionId=$event.target.data
  const classVisible=$event.target
  for (let index in this.questions){
     if (this.result[this.questions[index]][3] ===this.questionId){
       this.questionForAnswer=this.questions[index]
      
     }
  }
  if (this.displayAnswerForm === "d-none"){
    this.displayAnswerForm ="visible"
  }else{
    this.displayAnswerForm="d-none"
  }

  }
}
