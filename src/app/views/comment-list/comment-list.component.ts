import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/shared/models/comment';
import { CommentService } from 'src/app/shared/services/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit, OnDestroy {
  @Input() postId: number;
  comments: Comment[];
  private commentSubscription: Subscription;

  constructor(private commentService: CommentService) {
    this.comments = [];
  }

  ngOnInit(): void {
    this.comments = this.commentService.comments.filter(
      (comment) => comment.postId == this.postId
    );

    this.commentSubscription = this.commentService.commentChanged$.subscribe(
      (comments) => {
        this.comments = comments.filter(
          (comment) => comment.postId == this.postId
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.commentSubscription.unsubscribe();
  }
}
