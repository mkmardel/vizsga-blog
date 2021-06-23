import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Comment } from 'src/app/shared/models/comment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit, OnDestroy {
  @Input() comment: Comment;
  isAdmin: boolean;
  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private commentService: CommentService,
    private modalService: ModalService
  ) {
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.userState?.role == 'admin';
    this.subscription = this.authService.userStateChanged$.subscribe((user) => {
      this.isAdmin = user?.role == 'admin';
    });
  }

  deleteComment() {
    this.modalService.ConfirmState.forEach((state) => {
      if (state.action == 'delete_comment' && this.comment.id == state.id) {
        this.commentService.deleteComment(this.comment.id);
      }
    });
    this.modalService.showAlertModal(
      'Biztosan törölni szeretnéd a kommentet?',
      'delete_comment',
      'confirm',
      this.comment.id
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
