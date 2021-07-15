import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Comment } from 'src/app/shared/models/comment';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PostService } from 'src/app/shared/services/post.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit, OnDestroy {
  @Input() post: Post;
  @ViewChild('commentInput') commentInput: ElementRef;
  public loggedInUser: User;
  private userSubscription: Subscription;
  private commentsSubscription: Subscription;
  public showComments: boolean;
  public user: User;
  public loggedIn: boolean;
  public ownPost: boolean;
  public isUpdating: boolean;
  public isSubmitting: boolean;
  public isDeleting: boolean;

  constructor(
    private userService: UsersService,
    private modalService: ModalService,
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService
  ) {
    this.showComments = false;
    this.loggedIn = false;
    this.ownPost = false;
    this.isUpdating = false;
    this.isSubmitting = false;
    this.isDeleting = false;
  }

  ngOnInit(): void {
    this.user = this.userService.users.find(
      (user) => user.id == this.post.userId
    );
    this.loggedInUser = this.authService.userState;
    this.loggedIn = this.loggedInUser != null;
    this.ownPost = this.user.id == this.loggedInUser?.id;
    this.userSubscription = this.authService.userStateChanged$.subscribe(
      (user) => {
        this.loggedInUser = user;
        this.loggedIn = user != null;
        this.ownPost = this.user.id == user?.id;
      }
    );

    this.commentsSubscription = this.commentService.commentsChanged$.subscribe(
      () => {
        this.isSubmitting = false;
      }
    );
  }

  loadComments() {
    this.showComments = !this.showComments;
  }

  submitComment(text: string) {
    if (text == '') {
      this.modalService.showAlertModal(
        'Üres komment nem küldhető el!',
        null,
        'error'
      );
      return;
    }
    this.isSubmitting = true;
    let newComment = new Comment(this.post.id, this.loggedInUser.email, text);
    this.commentService.addComment(newComment);
    this.commentInput.nativeElement.value = '';
  }

  validateAction(deleting: boolean) {
    let hasComment = this.commentService.comments.find(
      (comment) => comment.postId == this.post.id
    );
    if (hasComment) {
      this.modalService.showAlertModal(
        `Olyan poszt nem ${
          deleting ? 'törölhető' : 'módosítható'
        } amelyre érkezett hozzászólás!`,
        null,
        'error'
      );
      return false;
    }
    return true;
  }

  editPost() {
    if (this.validateAction(false)) {
      this.isUpdating = !this.isUpdating;
    }
  }

  deletePost() {
    if (this.validateAction(true)) {
      this.modalService.ConfirmState.pipe(take(1)).forEach((state) => {
        if (state.action == 'delete_post' && state.id == this.post.id) {
          this.showSpinner();
          this.postService.deletePost(this.post.id);
        }
      });
      this.modalService.showAlertModal(
        'Biztosan törölni szeretnéd a posztot?',
        'delete_post',
        'confirm',
        this.post.id
      );
    }
  }

  showSpinner() {
    this.isDeleting = true;
    // response error offset
    setTimeout(() => {
      this.isDeleting = false;
    }, 10000);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
  }
}
