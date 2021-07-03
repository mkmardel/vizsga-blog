import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/shared/models/comment';
import { CommentService } from 'src/app/shared/services/comment.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit, OnDestroy {
  @Input() postId: number;
  private commentSubscription: Subscription;
  private routeSubscription: Subscription;
  public userId: number;
  public comments: Comment[];

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.comments = [];
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.userId = params['uid'];
      this.getData();
    });

    this.commentSubscription = this.commentService.commentsChanged$.subscribe(
      (comments) => {
        this.getData();
      }
    );
  }

  getData() {
    if (this.postId) {
      this.comments = this.commentService.comments.filter(
        (comment) => comment.postId == this.postId
      );
      return;
    }

    if (this.userId) {
      let email = this.usersService.users.find(
        (user) => user.id == Number(this.userId) + 1
      ).email;

      this.comments = this.commentService.comments.filter(
        (comment) => comment.email == email
      );
    }
  }

  ngOnDestroy(): void {
    this.commentSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}
