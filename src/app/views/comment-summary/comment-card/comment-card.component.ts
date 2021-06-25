import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/models/comment';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user';
import { PostService } from 'src/app/shared/services/post.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit {
  @Input() comment: Comment;
  public post: Post;
  public user: User;

  constructor(
    private postService: PostService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.post = this.postService.posts.find(
      (post) => post.id == this.comment.postId
    );
    this.user = this.usersService.users.find(
      (user) => user.id == this.post.userId
    );
  }
}
