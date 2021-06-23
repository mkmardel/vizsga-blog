import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsResolver } from './shared/resolvers/comments.resolver';
import { PostsResolver } from './shared/resolvers/posts.resolver';
import { UsersResolver } from './shared/resolvers/users.resolver';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { PostListComponent } from './views/post-list/post-list.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostListComponent,
    resolve: [PostsResolver, CommentsResolver, UsersResolver],
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
