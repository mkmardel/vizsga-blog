import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserRoleGuard } from './shared/guards/user-role.guard';
import { CommentsResolver } from './shared/resolvers/comments.resolver';
import { GalleryResolver } from './shared/resolvers/gallery.resolver';
import { PostsResolver } from './shared/resolvers/posts.resolver';
import { UsersResolver } from './shared/resolvers/users.resolver';

const routes: Routes = [
  {
    path: 'posts',
    loadChildren: () =>
      import('./views/post-list/post-list.module').then(
        (m) => m.PostListModule
      ),
    resolve: [UsersResolver, CommentsResolver, PostsResolver],
  },
  {
    path: 'comments',
    loadChildren: () =>
      import('./views/comment-summary/comment-summary.module').then(
        (m) => m.CommentSummaryModule
      ),
    resolve: [UsersResolver, PostsResolver, CommentsResolver],
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./views/users/users.module').then((m) => m.UsersModule),
    resolve: [CommentsResolver, UsersResolver],
    canActivate: [AuthGuard, UserRoleGuard],
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./views/gallery/gallery.module').then((m) => m.GalleryModule),
    resolve: [GalleryResolver],
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./views/account/account.module').then((m) => m.AccountModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./views/home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./views/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
