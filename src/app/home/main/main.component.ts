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
  constructor(private _Router: Router, private route: ActivatedRoute,private postsService:HomepostsService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.username=this.route.snapshot.paramMap.get('username' )
    this.displayAnswerForm='d-none'
    this.getQuestions()
  }

  questionForm=this.fb.group({
    questionText:new FormControl("")
  })

  answerForm=this.fb.group({
    answerText:new FormControl("")
  })
submitQuestion(){
   const question=this.questionForm.value
   console.log(question)
   this.postsService.askQuestion(this.username, question)
   .subscribe((responce=>{
     if (responce.res === true){
         console.log("question has been submitted")
     }
   }))

}

getQuestions(){
  this.postsService.getQuestions(this.username)
    .subscribe((responce=>{
      if (responce.res === true){
        this.result=JSON.parse(responce.json)
        this.questions=Object.keys(this.result)
        console.log(this.questions)
        console.log("works")
      }
    }
      ))
}

submitAnswer(){
  console.log(this.answerForm.value)
}
displayAnswerField($event){
  const questionId=$event.target.data
  console.log(questionId)
  if (this.displayAnswerForm === "d-none"){
    this.displayAnswerForm ="visible"
  }else{
    this.displayAnswerForm="d-none"
  }

  }
}
