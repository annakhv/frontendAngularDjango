import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserinfoService} from '../userinfo.service';
import {AngularFireStorage} from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchText:string;
  search:any;
  usernames:Array<string>
  profImage:string;
  index:string;
  message:string;
  reviewUser:string;
  constructor(private _Router: Router, private route: ActivatedRoute, private _UserinfoService: UserinfoService, private imageFile: AngularFireStorage) { }

  ngOnInit(): void {
 
    this.searchText=this.route.snapshot.paramMap.get('searchtext' )
    console.log(this.searchText)
    this._UserinfoService.searchUser( this.searchText)
    .subscribe((responce)=>{
      if (responce.res === true){
         this.search=JSON.parse(responce.json)
         this.usernames=Object.keys(JSON.parse(responce.json))
         for (this.index in this.usernames ){
             this.image(this.usernames[this.index])
         }
        
      }else{
        this.message=responce.message
      }
  });

  }

  image(username){
    this.imageFile.ref(`${username}`).getDownloadURL()
    .subscribe(url=>{
      this.profImage=url
      this.search[username].push(this.profImage)
    }, error => {
      this.imageFile.ref('blankprofile.png').getDownloadURL()
      .subscribe(url=>{
        this.profImage=url
        this.search[username].push(this.profImage)
      })
    
})

}

viewProfile($event){
  this.reviewUser=$event.target.id
  this._Router.navigate(['profile/', this.reviewUser, "other"])
  console.log("profileee vieww")
}
}