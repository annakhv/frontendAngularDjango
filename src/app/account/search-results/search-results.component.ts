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
  usernames:Array<string>;
  username:string;
  searcher:string;
  profImage:string;
  message:string;
  connections:string;
  constructor(private _Router: Router, private route: ActivatedRoute, private _UserinfoService: UserinfoService, private imageFile: AngularFireStorage) { }

  ngOnInit(): void {
    this.connections="Follow"
    this.searchText=this.route.snapshot.paramMap.get('searchtext' )
    this.username=this.route.snapshot.paramMap.get('username' )
    this.searcher=this.route.snapshot.paramMap.get('searcher')

    if (this.searchText ==="followers" ){
       this.followers()
    
    }
    else if(this.searchText === "following"){
       this.following()
    }else{
       this.userSearch()
    }

  }


  followers(){
    this._UserinfoService.getFollowers(this.username)
    .subscribe((responce)=>{
      if (responce.res ===true){
        this.search=JSON.parse(responce.json)
       this.usernames=Object.keys(JSON.parse(responce.json))
       this.checkUsernames(this.usernames)
       for (let index in this.usernames ){
           this.image(this.usernames[index])
       }
      
    }else{
      this.message=responce.message
    
      }
    }
    )

  }

  userSearch(){
    this._UserinfoService.searchUser( this.searchText)
    .subscribe((responce)=>{
      if (responce.res === true){
         this.search=JSON.parse(responce.json)
         this.usernames=Object.keys(JSON.parse(responce.json))
         this.checkUsernames(this.usernames)
         for (let index in this.usernames ){
             this.image(this.usernames[index])
         }
        
      }else{
        this.message=responce.message
      }
  });

  }
  following(){
  
     this._UserinfoService.getFollowing(this.username)
    .subscribe((responce)=>{
      if (responce.res ===true){
        this.search=JSON.parse(responce.json)
       this.usernames=Object.keys(JSON.parse(responce.json))
       console.log(this.usernames)
       this.checkUsernames(this.usernames)
       for (let index in this.usernames ){
           this.image(this.usernames[index])
           
       }
      
    }else{
      this.message=responce.message
    
      }
    }
    )
  
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
  const user=$event.target.data
  console.log(this.username)
  this._Router.navigate(['profile/', user, this.searcher])
  console.log("profileee vieww")
}


checkUsernames(usernames){
  this._UserinfoService.getFollowing(this.searcher)
  .subscribe((responce)=>{
    if (responce.res === true){
      const results=JSON.parse(responce.json)
     const userFollowing=Object.keys(results) 
     for (let index in usernames){
      if (userFollowing.indexOf(usernames[index]) > -1){
          this.search[usernames[index]].push("Following")
      }else{
       this.search[usernames[index]].push("Follow")
      }
 }
  }else{
    for(let index in usernames){
      this.search[usernames[index]].push("Follow")
    }
  }
  }
  )
}

followOrUnfollow($event){
  const user=$event.target.data

  this._UserinfoService.followUser(this.searcher, user)
     .subscribe((responce)=>{
          if(responce.res === true){
            if (this.searchText === "followers"){
              this.followers()
              console.log("followers updated")
            }else if
                 (this.searchText === "following")
                 { this.following()
                  console.log("following updated")
              }else{
                this.userSearch()
                console.log("usersearch updated")
              }
            
            
            console.log("works well, database has been updated")
         /*   if (this.search[user][2] === "Follow"){
              this.search[user[2]] ="Following"
            }else{
              this.search[user[2] = "Follow"]
            }
            */
          }
     }
      )

}
}

