import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  private userSubscription: Subscription;
  private commentsSubscription: Subscription;
  public isAdmin: boolean;
  public formVisible: boolean;
  public submitted: boolean;
  public commentForm: FormGroup;
  public isSubmitting: boolean;
  public isDeleting: boolean;

  constructor(
    private authService: AuthService,
    private commentService: CommentService,
    private modalService: ModalService,
    private router: Router
  ) {
    this.isAdmin = false;
    this.formVisible = false;
    this.submitted = false;
    this.isSubmitting = false;
    this.isDeleting = false;
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.userState?.role == 'admin';
    this.userSubscription = this.authService.userStateChanged$.subscribe(
      (user) => {
        this.isAdmin = user?.role == 'admin';
      }
    );

    this.initForm();

    this.commentsSubscription = this.commentService.commentsChanged$.subscribe(
      () => {
        this.isSubmitting = false;
        this.formVisible = false;
      }
    );
  }

  get cf() {
    return this.commentForm.controls;
  }

  visitPost(postId: any) {
    this.router.navigate(['/posts/' + postId]);
  }

  isPosts() {
    return this.router.url.indexOf('/posts') > -1;
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
    this.modalService.ConfirmState.pipe(take(1)).forEach((state) => {
      if (state.action == 'delete_comment' && this.comment.id == state.id) {
        this.showSpinner();
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

  showSpinner() {
    this.isDeleting = true;
    // response error offset
    setTimeout(() => {
      this.isDeleting = false;
    }, 10000);
  }

  onSubmit() {
    this.submitted = true;
    if (this.cf.invalid) {
      return;
    }
    this.isSubmitting = true;
    let updatedComment = this.comment;
    updatedComment.body = this.cf.commentBody.value;
    this.commentService.updateComment(updatedComment);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
  }
}
