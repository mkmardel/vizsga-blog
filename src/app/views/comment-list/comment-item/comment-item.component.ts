import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  private subscription: Subscription;
  public isAdmin: boolean;
  public formVisible: boolean;
  public submitted: boolean;
  public commentForm: FormGroup;

  constructor(
    private authService: AuthService,
    private commentService: CommentService,
    private modalService: ModalService
  ) {
    this.isAdmin = false;
    this.formVisible = false;
    this.submitted = false;
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.userState?.role == 'admin';
    this.subscription = this.authService.userStateChanged$.subscribe((user) => {
      this.isAdmin = user?.role == 'admin';
    });

    this.initForm();
  }

  get cf() {
    return this.commentForm.controls;
  }

  initForm() {
    this.commentForm = new FormGroup({
      commentBody: new FormControl('', [Validators.required]),
    });
  }

  editComment() {
    this.commentForm.controls['commentBody'].setValue(this.comment.body);
    this.formVisible = !this.formVisible;
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

  onSubmit() {
    this.submitted = true;
    if (this.cf.invalid) {
      return;
    }
    let updatedComment = this.comment;
    updatedComment.body = this.cf.commentBody.value;
    this.commentService.updateComment(updatedComment);
    this.formVisible = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
