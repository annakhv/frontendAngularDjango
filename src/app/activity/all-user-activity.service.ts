import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {BASE_URL} from '../../config';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AllUserActivityService {
  private baseUrl: string=BASE_URL;
  public toUser$=new BehaviorSubject <any>("")
  constructor(private http:HttpClient) { }

  getALLActivity(username:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/activity/personalActivity/${username}`);
  }
  getActiveUsers(username:string):Observable <any>{
    return this.http.get<any>(`${this.baseUrl}/activity/activeUsers/${username}`);
  }
  
  sendMessage(message:any):Observable <any> {
    return this.http.post<any>(`${this.baseUrl}/activity/sendMessage/${message.from}/${message.to}`, message)
  }

  inBoxMessages(username:string):Observable <any> {
    return this.http.get<any>(`${this.baseUrl}/activity/getInbox/${username}`)
  }

  sentMessages(username:string):Observable <any>{
    return  this.http.get<any>(`${this.baseUrl}/activity/getSentMessages/${username}`)
  }
  deleteMessage(username:string, messageId):Observable <any>{
    return this.http.get<any>(`${this.baseUrl}/activity/deleteMessage/${username}/${messageId}`)
  }

  getTheMessage(messageId:string):Observable <any> {
    return this.http.get<any>(`${this.baseUrl}/activity/singleMessage/${messageId}`)
  }
}
