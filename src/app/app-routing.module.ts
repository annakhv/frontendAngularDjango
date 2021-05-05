import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [

 {path: 'activity', loadChildren: ()=> import ( './activity/activity.module').then (m=> m.ActivityModule)}
];

@NgModule({
  imports: [
  
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
