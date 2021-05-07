import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL} from '../../config';
import {userData} from '../account/login/sign';
import {userRegister} from '../account/register/signin';
import {catchError, retry, map, tap} from 'rxjs/operators'
import {profile, education, work} from '../account/profile/profile.tempt';
import {BehaviorSubject,ReplaySubject} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  private baseUrl: string=BASE_URL;
  public user$=new ReplaySubject<any>(1)

  constructor(private http: HttpClient) { }

 
  
  logIn(user: userData) : Observable <boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/account/login`, user);
  }

  register(newuser: userRegister) : Observable <any> {
    const headers = { 'content-type': 'application/json'} 
    return this.http
    .post<any>(`${this.baseUrl}/account/register`, newuser, {'headers': headers})
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
loggedIn(){
  return !!localStorage.getItem('token')
}

loggedOut(username:string){
  return this.http.get<any>(`${this.baseUrl}/account/logout/${username}`);
  
}
getProfile(username: string) : Observable <any> {
  return this.http.get<any>(`${this.baseUrl}/account/profile/${username}`);
}

getifThisUserfollowsOtherUser(thisUsername:string, otherUsername:string ): Observable <any>{
  return this.http.get<any>(`${this.baseUrl}/account/ifThisUsernameFollows/${thisUsername}/${otherUsername}`);
}
updateprofile(userProfile:profile, username:string){
  return this.http.post<any>(`${this.baseUrl}/account/updateProfile/${username}`, userProfile);
}

addeducation(userEdu:education ,username:string, id:string){
  return this.http.post<any>(`${this.baseUrl}/account/addAndUpdateEdu/${username}/${id}`, userEdu);
}

addwork(userWork: work, username:string, id:String){
  return this.http.post<any>(`${this.baseUrl}/account/addAndUpdateWork/${username}/${id}`, userWork);
}
getEducation(username:string){
    return this.http.get<any>(`${this.baseUrl}/account/getEdu/${username}`);
}

getWork(username:string){
    return this.http.get<any>(`${this.baseUrl}/account/getWork/${username}`);
}

removeEducation(id:string){
  return this.http.get<any>(`${this.baseUrl}/account/deleteEdu/${id}`);
}
removeWork(id:string){
  return this.http.get<any>(`${this.baseUrl}/account/deleteWork/${id}`);
}
searchUser(searchText:string){
  return this.http.get<any>(`${this.baseUrl}/account/search/${searchText}`);
}

getFollowers(username:string){
  return this.http.get<any>(`${this.baseUrl}/account/getFollowers/${username}`);

}

getFollowing(username:string){
  return this.http.get<any>(`${this.baseUrl}/account/getFollowing/${username}`);
}

followUser(thisUsername:string, otherUsername:string){
  return this.http.get<any>(`${this.baseUrl}/account/followUser/${thisUsername}/${otherUsername}`);
}
}