import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { UserItemComponent } from './user-item/user-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserSelectComponent } from './user-select/user-select.component';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { CommentsResolver } from 'src/app/shared/resolvers/comments.resolver';
import { UsersResolver } from 'src/app/shared/resolvers/users.resolver';
import { CommentListModule } from '../comment-list/comment-list.module';

let routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: '', component: UserSelectComponent },
      {
        path: ':uid',
        component: CommentListComponent,
        resolve: [CommentsResolver, UsersResolver],
      },
    ],
  },
];

@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    UserItemComponent,
    UserSelectComponent,
  ],
  imports: [CommonModule, CommentListModule, RouterModule.forChild(routes)],
})
export class UsersModule {}
