import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {BASE_URL} from '../../config';
import {Observable,BehaviorSubject ,throwError as ObservableThrowError} from 'rxjs';
import {catchError, retry, map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AllUserActivityService {
  private baseUrl: string=BASE_URL;
  public toUser$=new BehaviorSubject <any>("")
  constructor(private http:HttpClient) { }

  errorHandler(error:HttpErrorResponse){
    return ObservableThrowError(error.message || "Server Error");

  }

  getALLActivity(username:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/activity/personalActivity/${username}`).pipe(
     catchError(this.errorHandler))
  }
  getActiveUsers(username:string):Observable <any>{
    return this.http.get<any>(`${this.baseUrl}/activity/activeUsers/${username}`).pipe(
      catchError(this.errorHandler))
  }
  
  sendMessage(message:any):Observable <any> {
    return this.http.post<any>(`${this.baseUrl}/activity/sendMessage/${message.from}/${message.to}`, message).pipe(
      catchError(this.errorHandler))
  }

  inBoxMessages(username:string):Observable <any> {
    return this.http.get<any>(`${this.baseUrl}/activity/getInbox/${username}`).pipe(
      catchError(this.errorHandler))
  }

  sentMessages(username:string):Observable <any>{
    return  this.http.get<any>(`${this.baseUrl}/activity/getSentMessages/${username}`).pipe(
      catchError(this.errorHandler))
  }
  deleteMessage(username:string, messageId):Observable <any>{
    return this.http.get<any>(`${this.baseUrl}/activity/deleteMessage/${username}/${messageId}`).pipe(
      catchError(this.errorHandler))
  }

  getTheMessage(messageId:string):Observable <any> {
    return this.http.get<any>(`${this.baseUrl}/activity/singleMessage/${messageId}`).pipe(
      catchError(this.errorHandler))
  }
}
