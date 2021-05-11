import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError as ObservableThrowError} from 'rxjs';
import {BASE_URL} from '../../config';
import {userData} from '../account/login/sign';
import {userRegister} from '../account/register/signin';
import {catchError, retry, map, tap} from 'rxjs/operators'
import {profile, education, work} from '../account/profile/profile.tempt';
import {BehaviorSubject,ReplaySubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  private baseUrl: string=BASE_URL;
  public user$=new ReplaySubject<any>(1)

  constructor(private http: HttpClient) { }

  errorHandler(error:HttpErrorResponse){
    return ObservableThrowError(error.message || "Server Error");

  }
  
  logIn(user: userData) : Observable <any> {
    return this.http.post<any>(`${this.baseUrl}/account/login`, user).pipe(
    catchError(this.errorHandler))
  }

  register(newuser: userRegister) : Observable <any> {
    const headers = { 'content-type': 'application/json'} 
    return this.http
    .post<any>(`${this.baseUrl}/account/register`, newuser, {'headers': headers}).pipe(
      catchError(this.errorHandler))        
  }

loggedIn(){
  return !!localStorage.getItem('token')
}

loggedOut(username:string){
  return this.http.get<any>(`${this.baseUrl}/account/logout/${username}`).pipe(
    catchError(this.errorHandler))
  
}
getProfile(username: string) : Observable <any> {
  return this.http.get<any>(`${this.baseUrl}/account/profile/${username}`).pipe(
    catchError(this.errorHandler))
}

getifThisUserfollowsOtherUser(thisUsername:string, otherUsername:string ): Observable <any>{
  return this.http.get<any>(`${this.baseUrl}/account/ifThisUsernameFollows/${thisUsername}/${otherUsername}`).pipe(
    catchError(this.errorHandler))
}
updateprofile(userProfile:profile, username:string){
  return this.http.post<any>(`${this.baseUrl}/account/updateProfile/${username}`, userProfile).pipe(
    catchError(this.errorHandler))
}

addeducation(userEdu:education ,username:string, id:string){
  return this.http.post<any>(`${this.baseUrl}/account/addAndUpdateEdu/${username}/${id}`, userEdu).pipe(
    catchError(this.errorHandler))
}

addwork(userWork: work, username:string, id:String){
  return this.http.post<any>(`${this.baseUrl}/account/addAndUpdateWork/${username}/${id}`, userWork).pipe(
    catchError(this.errorHandler))
}
getEducation(username:string){
    return this.http.get<any>(`${this.baseUrl}/account/getEdu/${username}`).pipe(
      catchError(this.errorHandler))
}

getWork(username:string){
    return this.http.get<any>(`${this.baseUrl}/account/getWork/${username}`).pipe(
      catchError(this.errorHandler))
}

removeEducation(id:string){
  return this.http.get<any>(`${this.baseUrl}/account/deleteEdu/${id}`).pipe(
    catchError(this.errorHandler))
}
removeWork(id:string){
  return this.http.get<any>(`${this.baseUrl}/account/deleteWork/${id}`).pipe(
    catchError(this.errorHandler))
}
searchUser(searchText:string){
  return this.http.get<any>(`${this.baseUrl}/account/search/${searchText}`).pipe(
    catchError(this.errorHandler))
}

getFollowers(username:string){
  return this.http.get<any>(`${this.baseUrl}/account/getFollowers/${username}`).pipe(
    catchError(this.errorHandler))

}

getFollowing(username:string){
  return this.http.get<any>(`${this.baseUrl}/account/getFollowing/${username}`).pipe(
    catchError(this.errorHandler))
}

followUser(thisUsername:string, otherUsername:string){
  return this.http.get<any>(`${this.baseUrl}/account/followUser/${thisUsername}/${otherUsername}`).pipe(
    catchError(this.errorHandler))
}
}