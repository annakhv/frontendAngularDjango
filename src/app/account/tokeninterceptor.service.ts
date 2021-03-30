import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req, next){
    let token=localStorage.getItem('token')
    let tokenizedReq=req.clone({
       setHeaders:{
         Authorization: `Bearer ${token}`
        
       }
    })
   
    return next.handle(tokenizedReq)

  }
}
