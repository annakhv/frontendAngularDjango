import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {BASE_URL} from '../../config';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AllUserActivityService {
  private baseUrl: string=BASE_URL;
  constructor(private http:HttpClient) { }

  getALLActivity(username:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/activity/personalActivity/${username}`);
  }
  getActiveUsers(username:string):Observable <any>{
    return this.http.get<any>(`${this.baseUrl}/activity/activeUsers/${username}`);
  }
}
