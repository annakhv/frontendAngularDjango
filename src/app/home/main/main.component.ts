import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {HomepostsService} from '../homeposts.service'
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public errorMsg;
   username:string;
   result: Array<any>;
   questions: Array<string>;
   displayAnswerForm:string;
   questionId:string;
   questionForAnswer:string;
   messageSubmitQuestion:string;
   answersObject:Array<any>
   commentsObject:Array<any>
   answer_id:string;
   @Output() childData=new EventEmitter()
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

 

 commentForm=this.fb.group({
    commentText:new FormControl("")
 })


submitQuestion(){
   const question=this.questionForm.value
   this.questionForm.reset();
   console.log(question)
   this.postsService.askQuestion(this.username, question)
   .subscribe((responce)=>{
     if (responce.res === true){
       this.messageSubmitQuestion=responce.question
       this.getQuestions()
       console.log("question has been submitted")
     }else{
       this.messageSubmitQuestion=responce.question
     }
   }, error=>this.errorMsg=error)
  
}

getAnswers(){
  this.postsService.getAnswers(this.username)
  .subscribe((responce)=>{
     if(responce.res === true){
       this.answersObject =responce.json
     }
  }, error=>this.errorMsg=error)
}


getQuestions(){
  this.postsService.getQuestions(this.username)
    .subscribe((responce)=>{
      if (responce.res === true){
        this.result=JSON.parse(responce.json)
        this.questions=Object.keys(this.result)
      }else{
         console.log("error")
      }
    }, error=>this.errorMsg=error
      )
}



thisQuestionAnswers($event){
  this._Router.navigate(['question/', $event.target.id, this.username])
  
}


displayAnswerField($event){
  this.questionId=$event.target.data
  for (let index in this.questions){
     if (this.result[this.questions[index]][3] ===this.questionId){
       this.questionForAnswer=this.questions[index]
      
     }
  }
  if (this.displayAnswerForm === "d-none"){
    this.displayAnswerForm ="visible"
  }
  }

  responceOk($event){
 
    this.getAnswers()
  }

/*
  close(){
    if(this.displayAnswerForm === 'visible'){
      this.displayAnswerForm ='d-none'
    }
  }

*/
  submitComment($event){
    const answerId=$event.target.data
    const comment=this.commentForm.value
    this.commentForm.reset()
    this.postsService.addComment(this.username, answerId, comment)
    .subscribe((responce:any)=>{
      if(responce.res ===true){
        console.log(responce.message)
      }
    }, error=>this.errorMsg=error
    )
  }
  
  getComments($event){
    this.commentsObject=[]
     const answerId=$event.target.data
     console.log(answerId)
     this.postsService.getComments( answerId, this.username)
     .subscribe((responce)=>{
        if(responce.res === true){
          this.commentsObject =JSON.parse(responce.json)
          console.log(this.commentsObject)
          this.answer_id=answerId
     }else{
          this.answer_id=answerId
     }
     }, error=>this.errorMsg=error);
    }
  


  upVote($event){
    console.log($event.target)
    console.log($event.target.data)
    const answer_id=$event.target.data
    this.postsService.upVoteAnswer(answer_id, this.username)
    .subscribe((responce:any)=>{
      if (responce.res=== true ){
        for (let item in this.answersObject){
          if( this.answersObject[item]['answerId']=== answer_id){
            if( this.answersObject[item]['thisUserUpVotedAnswer']===false){
              this.answersObject[item]['thisUserUpVotedAnswer']=true;
              this.answersObject[item]['upVotes']++;
          }else{
            this.answersObject[item]['thisUserUpVotedAnswer']=false;
            this.answersObject[item]['upVotes']--;
          }
        }
      }
      }
    }, error=>this.errorMsg=error)
  }
goProfile($event){
  const id=$event.target.data
  this._Router.navigate(["profile/", id, this.username])

}
  
}
