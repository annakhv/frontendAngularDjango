import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActivityComponent } from './user-activity/user-activity.component';
import {Routes} from '@angular/router'
import {RouterModule} from '@angular/router';

const routes : Routes = [
  {path: 'personalActivity/:username', component:UserActivityComponent}
]

@NgModule({
  declarations: [UserActivityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes
      )
  ]
})
export class ActivityModule { }
