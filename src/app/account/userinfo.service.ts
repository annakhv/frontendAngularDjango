import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL} from '../../config';
import {userData} from '../account/login/sign';
import {userRegister} from '../account/register/signin';
import {catchError, retry, map, tap} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  private baseUrl: string=BASE_URL;

  constructor(private http: HttpClient) { }
  logIn(user: userData) : Observable <boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/login`, user);
  }

  register(newuser: userRegister) : Observable <any> {
    const headers = { 'content-type': 'application/json'} 
    return this.http
    .post<any>(`${this.baseUrl}/register`, newuser, {'headers': headers})
    /* .pipe(
       map((result)=>{
         if( result.message =="ok"){
            console.log("ok")
           
         }else{
          console.log(result.message)
         }
        })
     )   
     */            
  }

}

