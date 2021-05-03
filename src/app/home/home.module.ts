import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import {Routes} from '@angular/router'
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from '../account/auth.guard';
import { SingleQuestionWithAnswersComponent } from './single-question-with-answers/single-question-with-answers.component';

const routes: Routes =[
  {path: '', redirectTo:'home/:username', pathMatch:'full' },
  {path: 'home/:username', component: MainComponent, canActivate: [AuthGuard] 
},
{path: 'question/:questionId', component: SingleQuestionWithAnswersComponent, canActivate: [AuthGuard]},
]


@NgModule({
  declarations: [MainComponent, SingleQuestionWithAnswersComponent],
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
