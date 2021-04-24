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
  updateEduClass:string;
  updateWorkClass:string;
  eduId:string;
  workId:string;
  constructor(private _Router: Router, private fb: FormBuilder, private route: ActivatedRoute,  private _UserinfoService: UserinfoService, private imageFile:AngularFireStorage) { }

  ngOnInit(): void {
   this.username=this.route.snapshot.paramMap.get('username' )
   console.log(this.username)
   this.userType=this.route.snapshot.paramMap.get('type' )
   this.profilType(this.userType)
   this.getProfile()
   this.getEducation()
   this.getWork()
   this.userprofile=new profile('birthdate', "country of origin", "current country", "relationship status")
   this.image(this.username)
   this.display="d-none"
   this._display="d-none"
   this.displayEdu="d-none"
   this.displayWork="d-none"
   this.updateEduClass="d-none"
   this.updateWorkClass="d-none"
   this.countries=allcountry;
   }
    
   profilType(type){   //this is to differentiate whether user sees his own profile or other user's profile
     if (type === "myself"){
        this.userType="visible"
     }else{
        this.userType ="d-none"
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
       console.log("check heree")
       this.basic_prof=responce;
       this.keys=Object.keys(responce)
       let index=this.keys.indexOf("res")
       this.keys.splice(index,1)
       this.firstname=responce.firstname;
       this.lastname=responce.lastname;
       console.log(this.lastname)
     }

  }) 

  }
  getEducation() {
  this._UserinfoService.getEducation(this.username)
  .subscribe((responce:any)=>{
    if (responce.res === true){
      this.jsonParse=JSON.parse(responce.json)

    }
  }
  )
  }
  
  getWork(){
  this._UserinfoService.getWork(this.username)
  .subscribe((responce:any)=>{
    if (responce.res === true){
      this._jsonParse=JSON.parse(responce.json)
      console.log(this._jsonParse)

    }
  }
  )
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
  this.eduId=$event.target.id
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
      }
      )
  console.log("updateedu is submited")
}


 updateWork($event){
   this.workId=$event.target.id
  if (this.updateWorkClass === "d-none"){
    this.updateWorkClass="visible"
  }else{
  this.updateWorkClass="d-none"

}
 }
 submitUpdateWork(){
   console.log(this.workId)
   this.userworkplace=new work(this.workForm.value.workplace, this.workForm.value.country, this.workForm.value.startdate, this.workForm.value.enddate)
   this._UserinfoService.addwork(this.userworkplace, this.username, this.workId)
   .subscribe((responce)=>{
      if (responce.res === true){  
         this.messageUpdateWork=responce.message
         this.getWork()
        console.log("work has been updated")
      }
   })
  console.log("updatework has been submitted" )
}

profileSubmit(){
this._UserinfoService.updateprofile(this.userprofile, this.username)
.subscribe((responce:any)=>{
   if (responce.res ===true ){
      this.message=responce.message
      this.getProfile()
     
   }
})

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

submitEdu(){
  const id = "add"
  this.usereducation=new education(this.eduForm.value.type,this.eduForm.value.institution, this.eduForm.value.country, this.eduForm.value.startdate, this.eduForm.value.enddate)
  this._UserinfoService.addeducation(this.usereducation, this.username, id)
      .subscribe((responce :any)=>{
        if(responce.res === true){
          this.messageEdu=responce.message
          this.getEducation()
      
        }
      }
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
  })
}

submitSearch() {
  this._Router.navigate([`search/${this.username}/${this.searchForm.value.searchText}`])
}

followers(){
  this._Router.navigate([`search/${this.username}/followers`])
  console.log("works followers")
}

following(){
  this._Router.navigate([`search/${this.username}/following`])
  console.log("works following")
}

homePage(){
  this._Router.navigate([`home/${this.username}`])
}

}