import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserRoleGuard } from './shared/guards/user-role.guard';
import { CommentsResolver } from './shared/resolvers/comments.resolver';
import { GalleryResolver } from './shared/resolvers/gallery.resolver';
import { PostsResolver } from './shared/resolvers/posts.resolver';
import { UsersResolver } from './shared/resolvers/users.resolver';
import { AccountComponent } from './views/account/account.component';
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
  },
  {
    path: 'posts/:id',
    component: PostListComponent,
    resolve: [UsersResolver, CommentsResolver, PostsResolver],
  },
  {
    path: 'comments',
    component: CommentSummaryComponent,
    resolve: [UsersResolver, PostsResolver, CommentsResolver],
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    resolve: [CommentsResolver, UsersResolver],
    canActivate: [AuthGuard, UserRoleGuard],
    children: [
      { path: '', component: UserSelectComponent },
      {
        path: ':uid',
        component: CommentListComponent,
        resolve: [CommentsResolver, UsersResolver],
      },
    ],
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    resolve: [GalleryResolver],
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
