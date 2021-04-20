import {Injectable } from '@angular/core';
import {BASE_URL} from '../../config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HomepostsService {
  private baseUrl: string=BASE_URL;

  constructor(private http: HttpClient) { }

  askQuestion(username:string, data:string) : Observable <boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/home/askQuestion${username}`, data);
  }
  

  getQuestions(username:string): Observable <boolean>{
    return  this.http.get<boolean>(`${this.baseUrl}/home/getQuestions/${username}`);
  }

 answerQuestion(username:string, questionId:string, answer:string): Observable <boolean>{
    return this.http.post<boolean>(`${this.baseUrl}/home/answerQuestion/${username}${questionId}`, answer);
 }

 addComment(username:string,answerId:string, comment:string): Observable <boolean>{
  return this.http.post<boolean>(`${this.baseUrl}/home/answerQuestion/${username}${answerId}`, comment);
}
getAnswersWithComments(username:string): Observable <boolean>{
  return  this.http.get<boolean>(`${this.baseUrl}/home/getAnswersAndComments/${username}`);

}
}
