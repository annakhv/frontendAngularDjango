import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AllUserActivityService } from '../all-user-activity.service';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.css']
})
export class UserActivityComponent implements OnInit {
  public errorMsg;
  username:string;
  info: Array<any>
  constructor(private route:ActivatedRoute, private user_activity:AllUserActivityService) { }
 

  ngOnInit(): void {
    this.username=this.route.snapshot.paramMap.get('username')
    console.log(this.username)
    this.getActivity()
  }


getActivity(){
   this.user_activity.getALLActivity(this.username)
   .subscribe((responce)=>{
     if (responce.res === true){
       this.info=JSON.parse(responce.json)
       console.log(this.info)
     }
   },error=>this.errorMsg=error
   )
}

removeQuestion($event){  //not implemented for now
  console.log($event.target.data)
}

removeAnswer($event){//not implemented for now
  console.log($event.target.data)
}

removeComment($event){//not implemented for now
  console.log($event.target.data)
}
}
