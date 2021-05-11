import { Component, OnInit } from '@angular/core';
import {HomepostsService} from '../homeposts.service'
import {ActivatedRoute, Router} from '@angular/router';



@Component({
  selector: 'app-single-question-with-answers',
  templateUrl: './single-question-with-answers.component.html',
  styleUrls: ['./single-question-with-answers.component.css']
})
export class SingleQuestionWithAnswersComponent implements OnInit {
  public errorMsg;
  visibility:string;
  questionId:string;
  questionInfo:any
  answers : Array<Map<string,string>>
  constructor(private _Router: Router, private route: ActivatedRoute,private postsService:HomepostsService) { }

  ngOnInit(): void {
    this.visibility='d-none'
    this.questionId=this.route.snapshot.paramMap.get('questionId' )
    this.getQuestionWithAnswers(this.questionId)
  }

responceOk($event){
 
  this.getQuestionWithAnswers(this.questionId)
}

answerForm($event){
  this.visibility='visible'
  
}


getQuestionWithAnswers(id){
  this.postsService.thisQuestionAnswers(id)
  .subscribe((responce:any)=>{
    if (responce.res === true){
      this.questionInfo=responce.questionInfo
      this.answers=JSON.parse(responce.json)
  
    
    }
  }, error=>this.errorMsg=error)

}
}