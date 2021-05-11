import {Injectable } from '@angular/core';
import {BASE_URL} from '../../config';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError as ObservableThrowError } from 'rxjs';
import {catchError, retry, map, tap} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class HomepostsService {
  private baseUrl: string=BASE_URL;

  constructor(private http: HttpClient) { }

  errorHandler(error:HttpErrorResponse){
    return ObservableThrowError(error.message || "Server Error");

  }

  askQuestion(username:string, data:string) : Observable <any> {
    return this.http.post<boolean>(`${this.baseUrl}/home/askQuestion/${username}`, data).pipe(
      catchError(this.errorHandler))
  }
  
  getQuestions(username:string): Observable <any>{
    return  this.http.get<boolean>(`${this.baseUrl}/home/getQuestions/${username}`).pipe(
      catchError(this.errorHandler))
  }

 answerQuestion(username:string, questionId:string, answer:string): Observable <any>{
    return this.http.post<boolean>(`${this.baseUrl}/home/answerQuestion/${username}/${questionId}`, answer).pipe(
      catchError(this.errorHandler))
 }

 addComment(username:string,answerId:string, comment:string): Observable <any>{
  return this.http.post<boolean>(`${this.baseUrl}/home/addComment/${username}/${answerId}`, comment).pipe(
    catchError(this.errorHandler))
}
getAnswers(username:string): Observable <any>{
  return  this.http.get<boolean>(`${this.baseUrl}/home/getAnswers/${username}`).pipe(
    catchError(this.errorHandler))

}

getComments(answer_id:string, username:string): Observable <any>{
  return this.http.get<boolean>(`${this.baseUrl}/home/getComment/${username}/${answer_id}`).pipe(
    catchError(this.errorHandler))
}

upVoteAnswer(answer_id:string, username:string):Observable <any>{
  return this.http.get<boolean>(`${this.baseUrl}/home/upVoteAnswer/${username}/${answer_id}`).pipe(
    catchError(this.errorHandler))
}

thisQuestionAnswers(questionId:string): Observable <any> {
  return this.http.get<boolean>(`${this.baseUrl}/home/thisQuestionAnswers/${questionId}`).pipe(
    catchError(this.errorHandler))

}
}