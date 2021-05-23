import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { EqualValidatorDirective } from './equal-validator.directive';
import {ActivityModule} from '../activity/activity.module'
import { MessageFormComponent } from '../activity/message-form/message-form.component';

const routes: Routes =[
  {path: 'registeruser',component: RegisterComponent
}, 
{
  path: '', redirectTo: "/login", pathMatch: "full"
},
{
  path: 'login', component:LoginComponent
},
{ path: 'profile/:username/:searcher', component: ProfileComponent, canActivate: [AuthGuard]
  
},
{ path: 'search/:username/:searcher/:searchtext', component: SearchResultsComponent, canActivate: [AuthGuard]
  
},
]

@NgModule({
  declarations: [ RegisterComponent, LoginComponent, ProfileComponent, UpdateProfileComponent, SearchResultsComponent, EqualValidatorDirective],
  imports: [
    CommonModule,
    FormsModule,
    ActivityModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes
    )
  ],
  exports: [  RouterModule]
})




export class AccountModule{ }

