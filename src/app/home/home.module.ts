import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { PostcommentsComponent } from './postcomments/postcomments.component';



@NgModule({
  declarations: [PostsComponent, SinglePostComponent, PostcommentsComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
