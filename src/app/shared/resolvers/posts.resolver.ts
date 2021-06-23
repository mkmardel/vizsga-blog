import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Injectable({
  providedIn: 'root',
})
export class PostsResolver implements Resolve<Post[]> {
  constructor(private postService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post[]> | Post[] {
    const posts = this.postService.posts;
    if (posts.length === 0) {
      return this.postService.fetchPosts();
    }
    return posts;
  }
}
