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

const routes: Routes =[
  {path: 'registeruser',component: RegisterComponent
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
  declarations: [ RegisterComponent, LoginComponent, ProfileComponent, UpdateProfileComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes
    )
  ],
  exports: [RouterModule]
})
export class AccountModule { }
