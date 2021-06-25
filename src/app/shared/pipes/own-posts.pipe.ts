import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/post';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'ownPosts',
})
export class OwnPostsPipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  transform(posts: Post[], applyFilter: boolean): Post[] {
    if (applyFilter) {
      let userId = this.authService.userState?.id;
      return posts.filter((post) => post.userId == userId);
    }
    return posts;
  }
}
