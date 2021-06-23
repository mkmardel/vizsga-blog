import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
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
  showComments: boolean;
  user: User;
  loggedIn: boolean;
  private subscription: Subscription;

  constructor(
    private userService: UsersService,
    private modalService: ModalService,
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService
  ) {
    this.showComments = false;
    this.loggedIn = false;
  }

  ngOnInit(): void {
    this.user = this.userService.users.find(
      (user) => user.id == this.post.userId
    );
    this.loggedIn = this.authService.userState != null;
    this.subscription = this.authService.userStateChanged$.subscribe((user) => {
      this.loggedIn = user != null;
    });
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
    let newId = this.postService.posts.length + 1;
    let newComment = new Comment(
      this.post.id,
      newId,
      '',
      this.user.email,
      text
    );
    this.commentService.addComment(newComment);
    this.commentInput.nativeElement.value = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
