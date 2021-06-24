import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/models/comment';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentService } from 'src/app/shared/services/comment.service';

@Component({
  selector: 'app-comment-summary',
  templateUrl: './comment-summary.component.html',
  styleUrls: ['./comment-summary.component.scss'],
})
export class CommentSummaryComponent implements OnInit {
  private currentUser: User;
  public comments: Comment[];

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.userState;
    this.comments = this.commentService.comments.filter(
      (comment) => comment.email == this.currentUser.email
    );
  }
}
