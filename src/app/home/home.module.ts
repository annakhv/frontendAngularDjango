import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import {Routes} from '@angular/router'
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
const routes: Routes =[
  {path: '', redirectTo:'home/:username', pathMatch:'full'},
  {path: 'home/:username', component: MainComponent
},
]


@NgModule({
  declarations: [MainComponent],
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
