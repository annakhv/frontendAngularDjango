import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActivityComponent } from './user-activity/user-activity.component';
import {Routes} from '@angular/router'
import {RouterModule} from '@angular/router';
import { AuthGuard } from '../account/auth.guard';
import { MessageboxComponent } from './messagebox/messagebox.component';

const routes : Routes = [
  {path: 'personalActivity/:username', component:UserActivityComponent, canActivate: [AuthGuard] },
  {path: 'messageBox/:username', component: MessageboxComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [UserActivityComponent, MessageboxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes
      )
  ]
})
export class ActivityModule { }
