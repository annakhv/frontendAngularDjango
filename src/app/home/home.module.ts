import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import {Routes} from '@angular/router'
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from '../account/auth.guard';
import { SingleQuestionWithAnswersComponent } from './single-question-with-answers/single-question-with-answers.component';
import { AnswerQuestionComponent } from './answer-question/answer-question.component';

const routes: Routes =[
  {path: '', redirectTo:'home/:username', pathMatch:'full' },
  {path: 'home/:username', component: MainComponent, canActivate: [AuthGuard] 
},
{path: 'question/:questionId/:username', component: SingleQuestionWithAnswersComponent, canActivate: [AuthGuard]},
]


@NgModule({
  declarations: [MainComponent, SingleQuestionWithAnswersComponent, AnswerQuestionComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes
      )
  ],

  exports: [RouterModule]
})
export class HomeModule { }
