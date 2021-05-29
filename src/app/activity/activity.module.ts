import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActivityComponent } from './user-activity/user-activity.component';
import {Routes} from '@angular/router'
import {RouterModule} from '@angular/router';
import { AuthGuard } from '../account/auth.guard';
import { MessageboxComponent } from './messagebox/messagebox.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MessageFormComponent } from './message-form/message-form.component';

const routes : Routes = [
  {path: 'personalActivity/:username', component:UserActivityComponent, canActivate: [AuthGuard] },
  {path: 'messageBox/:searcher', component: MessageboxComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [UserActivityComponent, MessageboxComponent, MessageFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes
      )
  ],
  exports:[MessageFormComponent]
})
export class ActivityModule { }
