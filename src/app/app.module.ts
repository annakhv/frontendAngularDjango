import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccountModule} from './account/account.module';
import {HomeModule} from './home/home.module'
import { UserinfoService } from './account/userinfo.service';
import { AuthGuard } from './account/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokeninterceptorService } from './account/tokeninterceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    HomeModule
  ],
  providers: [UserinfoService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
