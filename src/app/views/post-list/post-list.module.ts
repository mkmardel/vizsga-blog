import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CommentsResolver } from 'src/app/shared/resolvers/comments.resolver';
import { PostsResolver } from 'src/app/shared/resolvers/posts.resolver';
import { UsersResolver } from 'src/app/shared/resolvers/users.resolver';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostItemComponent } from './post-item/post-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentListModule } from '../comment-list/comment-list.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: ':id',
    component: PostListComponent,
    resolve: [UsersResolver, CommentsResolver, PostsResolver],
  },
];

@NgModule({
  declarations: [PostListComponent, PostCreateComponent, PostItemComponent],
  imports: [
    CommonModule,
    CommentListModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class PostListModule {}
