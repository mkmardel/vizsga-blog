import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsResolver } from './shared/resolvers/comments.resolver';
import { PostsResolver } from './shared/resolvers/posts.resolver';
import { UsersResolver } from './shared/resolvers/users.resolver';
import { CommentListComponent } from './views/comment-list/comment-list.component';
import { CommentSummaryComponent } from './views/comment-summary/comment-summary.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { PostListComponent } from './views/post-list/post-list.component';
import { UserSelectComponent } from './views/users/user-select/user-select.component';
import { UsersComponent } from './views/users/users.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostListComponent,
    resolve: [UsersResolver, CommentsResolver, PostsResolver],
    pathMatch: 'full',
  },
  {
    path: 'comments',
    component: CommentSummaryComponent,
    resolve: [UsersResolver, PostsResolver, CommentsResolver],
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersComponent,
    resolve: [CommentsResolver, UsersResolver],
    children: [
      { path: '', component: UserSelectComponent },
      {
        path: ':id',
        component: CommentListComponent,
        resolve: [CommentsResolver, UsersResolver],
      },
    ],
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    resolve: [],
    pathMatch: 'full',
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
