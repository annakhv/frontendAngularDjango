import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Routes} from '@angular/router'
import { HttpClientModule } from '@angular/common/http';

const routes: Routes =[
  {path: 'registeruser',component: RegisterComponent
}, 
{
  path: 'login', component:LoginComponent
},
{ path: 'profile/:username', component: ProfileComponent

},

]

@NgModule({
  declarations: [ RegisterComponent, LoginComponent, ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes
    )
  ],
  exports: [RouterModule]
})
export class AccountModule { }
