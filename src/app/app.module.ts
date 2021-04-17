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
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import { LoginComponent } from './account/login/login.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    HomeModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBaKeoZcSUKTmfiwD2cWvo2oPKcHPfdJhY",
    authDomain: "angularproject-c870d.firebaseapp.com",
    projectId: "angularproject-c870d",
    storageBucket: "angularproject-c870d.appspot.com",
    messagingSenderId: "856186845120",
    appId: "1:856186845120:web:51d315cac5e42486803a25",
    measurementId: "G-9VMTYD91P8"
    }),
    AngularFireStorageModule,
  
  ],
  providers: [UserinfoService, LoginComponent, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
