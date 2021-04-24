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

  askQuestion(username:string, data:string) : Observable <any> {
    return this.http.post<boolean>(`${this.baseUrl}/home/askQuestion/${username}`, data);
  }
  
  getQuestions(username:string): Observable <any>{
    return  this.http.get<boolean>(`${this.baseUrl}/home/getQuestions/${username}`);
  }

 answerQuestion(username:string, questionId:string, answer:string): Observable <any>{
    return this.http.post<boolean>(`${this.baseUrl}/home/answerQuestion/${username}/${questionId}`, answer);
 }

 addComment(username:string,answerId:string, comment:string): Observable <any>{
  return this.http.post<boolean>(`${this.baseUrl}/home/addComment/${username}/${answerId}`, comment);
}
getAnswers(username:string): Observable <any>{
  return  this.http.get<boolean>(`${this.baseUrl}/home/getAnswers/${username}`);

}

getComments(answer_id:string, username:string): Observable <any>{
  return this.http.get<boolean>(`${this.baseUrl}/home/getComment/${username}/${answer_id}`)
}
}
