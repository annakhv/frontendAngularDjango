import { Component, OnInit  } from '@angular/core';
import {UserinfoService} from '../userinfo.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {LoginComponent} from '../login/login.component';
import {userData} from '../login/sign';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError} from 'rxjs/Operators';
import {allcountry} from './countryData';
import {profile, education, work} from './profile.tempt';
import {FormControl, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {MessageFormComponent} from '../../activity/message-form/message-form.component';
import {BehaviorSubject} from 'rxjs'
import { AllUserActivityService } from '../../activity/all-user-activity.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username:string;
  firstname:string;
  lastname:string;
  profImage:string;
  error:string;
  display:string;
  _display:string;
  displayEdu:string;
  displayWork:string;
  countries:Array<any>;
  userprofile:profile;
  usereducation:education;
  userworkplace: work;
  message: string;
  messageEdu:string;
  messageWork:string;
  messageUpdateWork:string;
  messageUpdateEdu:string;
  keys: Array<string>;
  basic_prof:Object;
  jsonParse: Array<any>
  _jsonParse: Array<any>
  data:string;
  formButtons:string;
  userType:string;
  userType1:string;
  updateEduClass:string;
  updateWorkClass:string;
  eduId:string;
  workId:string;
  searcher:string;
  ifUserFollows:boolean;
  displayMessageForm:string;
  public errorMsg;
  constructor(private messageService: AllUserActivityService   ,private _Router: Router, private fb: FormBuilder, private route: ActivatedRoute,  private _UserinfoService: UserinfoService, private imageFile:AngularFireStorage) { }

  ngOnInit(): void {
   this.username=this.route.snapshot.paramMap.get('username' )
   this.searcher=this.route.snapshot.paramMap.get('searcher' )
   this.profilType(this.searcher)
   this.getProfile()
   this.getEducation()
   this.getWork()
   this.ifFollows()
   this.userprofile=new profile('birthdate', "country of origin", "current country", "relationship status")
   this.image(this.username)
   this.display="d-none"
   this._display="d-none"
   this.displayEdu="d-none"
   this.displayWork="d-none"
   this.updateEduClass="d-none"
   this.updateWorkClass="d-none"
   this.countries=allcountry;
   this.displayMessageForm='d-none'
 
   }
    
   profilType(searcher){   //this is to differentiate whether user sees his own profile or other user's profile
     if (searcher === this.username){
        this.userType="visible"
        this.userType1="d-none"
     }else{
        this.userType ="d-none"
        this.userType1="visible"
     }

   }


   image(username){
    this.imageFile.ref(`${username}`).getDownloadURL()
    .subscribe(url=>{
      this.profImage=url
    }, error => {
       this.image('blankprofile.png')
    })
 
  }
  upload($event){
    const path=$event.target.files[0];
    this.imageFile.upload(`${this.username}`, path)

   }
   
  getProfile(){
  this._UserinfoService.getProfile(this.username)
  .subscribe((responce: any)=>{
     if(responce.res === true ){
       this.basic_prof=responce;
       this.keys=Object.keys(responce)
       let index=this.keys.indexOf("res")
       this.keys.splice(index,1)
       this.firstname=responce.firstname;
       this.lastname=responce.lastname;
      
     }

  }, error=>this.errorMsg=error) 

  }
  getEducation() {
  this._UserinfoService.getEducation(this.username)
  .subscribe((responce:any)=>{
    if (responce.res === true){
      this.jsonParse=JSON.parse(responce.json)
      
     

    }
  },  error=>this.errorMsg=error)

  }
  
  getWork(){
  this._UserinfoService.getWork(this.username)
  .subscribe((responce:any)=>{
    if (responce.res === true){
      this._jsonParse=JSON.parse(responce.json)


    }
  }, error=>this.errorMsg=error)
}

removeWork($event){
  const id=$event.target.data
  console.log(id)
  this._UserinfoService.removeWork(id)
  .subscribe((responce:any)=>{
    if (responce.res === true){
       console.log(responce.message)
       this.getWork()
    }else{
       console.log(responce.message)
    }
  }, error=>this.errorMsg=error)
}

removeEdu($event){
  const id=$event.target.data
  console.log(id)
  this._UserinfoService.removeEducation(id)
  .subscribe((responce:any)=>{
    if (responce.res === true){
       console.log(responce.message)
       this.getEducation()
    }else{
       console.log(responce.message)
    }
  }, error=>this.errorMsg=error)
}


basicData(){
  if (this.display === "d-none"){
    this.display="visible"
  }else{
  this.display="d-none"
 
}

}

eduWork(){ 
  if (this._display === "d-none"){
    this._display="visible"
  }else{
  this._display="d-none"
 
}
}

edu(){
  if (this.displayEdu === "d-none"){
    this.displayEdu="visible"
    this.eduWork()
  }else{
  this.displayEdu="d-none"
}
}
work(){
  if (this.displayWork === "d-none"){
    this.displayWork="visible"
    this.eduWork()
  }else{
  this.displayWork="d-none"
 
}
}

updateEdu($event){
  this.eduId=$event.target.data
  if (this.updateEduClass === "d-none"){
    this.updateEduClass="visible"
  }else{
  this.updateEduClass="d-none"

}
}
submitUpdateEdu(){
  console.log(this.eduId)
  this.usereducation=new education(this.eduForm.value.type,this.eduForm.value.institution, this.eduForm.value.country, this.eduForm.value.startdate, this.eduForm.value.enddate)
  console.log(this.usereducation)
  this._UserinfoService.addeducation(this.usereducation, this.username,this.eduId)
      .subscribe((responce :any)=>{
        if(responce.res === true){
          this.messageUpdateEdu=responce.message
          this.getEducation()
           console.log("edu has been updated")
        }
      }, error=>this.errorMsg=error )
 
  console.log("updateedu is submited")
}


 updateWork($event){
   this.workId=$event.target.data
  if (this.updateWorkClass === "d-none"){
    this.updateWorkClass="visible"
  }else{
  this.updateWorkClass="d-none"

}
 }
 submitUpdateWork(){
   console.log(this.workId)
   this.userworkplace=new work(this.workForm.value.workplace, this.workForm.value.country, this.workForm.value.startdate, this.workForm.value.enddate)
   this.workForm.reset()
   this._UserinfoService.addwork(this.userworkplace, this.username, this.workId)
   .subscribe((responce)=>{
      if (responce.res === true){  
         this.messageUpdateWork=responce.message
         this.getWork()
        console.log("work has been updated")
      }
   },  error=>this.errorMsg=error)
  console.log("updatework has been submitted" )
}

profileSubmit(){
this._UserinfoService.updateprofile(this.userprofile, this.username)
.subscribe((responce:any)=>{
   if (responce.res ===true ){
      this.message=responce.message
      this.getProfile()
     
   }
}, error=>this.errorMsg=error)

}


eduForm= this.fb.group({
   startdate:new FormControl("startdate"),
   enddate:new FormControl("enddate"),
   type: new FormControl("type"),
   institution: new FormControl("institution"),
   country: new FormControl("country"),
 


})
workForm= this.fb.group({
  startdate:new FormControl("startdate"),
  enddate:new FormControl("enddate"),
  workplace: new FormControl("workplace"),
  country: new FormControl("country"),

})

searchForm=this.fb.group({
  searchText:new FormControl("")
})


followUser(){
  console.log("printprint")
  this._UserinfoService.followUser(this.searcher, this.username)
  .subscribe((responce:any)=>{
    if(responce.res ===true){
      console.log("followings list has been updated")
      this.ifFollows()
    }
    }, error=>this.errorMsg=error
  )
}

ifFollows(){
  this._UserinfoService.getifThisUserfollowsOtherUser(this.searcher, this.username)
  .subscribe((responce:any)=>{
    if (responce.following === true){
      this.ifUserFollows=true;
        console.log("yes this user follows that user")
    }else{
      this.ifUserFollows=false;
       console.log("no this user doesnt follow ")
    }
  }, error=>this.errorMsg=error)
}
submitEdu(){
  const id = "add"
  this.usereducation=new education(this.eduForm.value.type,this.eduForm.value.institution, this.eduForm.value.country, this.eduForm.value.startdate, this.eduForm.value.enddate)
  this.eduForm.reset()
  this._UserinfoService.addeducation(this.usereducation, this.username, id)
      .subscribe((responce :any)=>{
        if(responce.res === true){
          this.messageEdu=responce.message
          this.getEducation()
      
        }
      }, error=>this.errorMsg=error
      )
}
submitWork(){
  const id="add"
  this.userworkplace=new work(this.workForm.value.workplace, this.workForm.value.country, this.workForm.value.startdate, this.workForm.value.enddate)
  this._UserinfoService.addwork(this.userworkplace, this.username, id)
  .subscribe((responce)=>{
     if (responce.res === true){
       this.messageWork=responce.message
       this.getWork()
       
     }
  }, error=>this.errorMsg=error)
}

submitSearch() {
  this._Router.navigate([`search/${this.username}/${this.searcher}/${this.searchForm.value.searchText}`])
}

followers(){
  this._Router.navigate([`search/${this.username}/${this.searcher}/followers`])
  console.log("works followers")
}

following(){
  this._Router.navigate([`search/${this.username}/${this.searcher}/following`])
  console.log("works following")
}


activity(){
  this._Router.navigate([`activity/personalActivity/${this.username}`])
}


sendMessage(){
  this.displayMessageForm="visible";
  console.log(this.username)
  this.messageService.toUser$.next(this.username)// send to this user
}
}