import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PostService } from 'src/app/shared/services/post.service';
declare var $: any;

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit, OnDestroy {
  @Input() isUpdating: boolean;
  @Input() post: Post;
  @Output() closeForm = new EventEmitter();
  @Output() applyFilter = new EventEmitter<boolean>();
  private subscription: Subscription;
  public formVisible: boolean;
  public submitted: boolean;
  public postForm: FormGroup;
  public user: User;
  public loggedIn: boolean;
  public filtered: boolean;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {
    this.formVisible = false;
    this.submitted = false;
    this.loggedIn = false;
    this.filtered = false;
  }

  ngOnInit(): void {
    this.user = this.authService.userState;
    this.loggedIn = this.user != null;

    this.authService.userStateChanged$.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });

    this.initForm();

    if (this.isUpdating) {
      this.postForm.controls['postTitle'].setValue(this.post.title);
      this.postForm.controls['postBody'].setValue(this.post.body);
      this.formVisible = true;
    }
  }

  get pf() {
    return this.postForm.controls;
  }

  initForm() {
    this.postForm = new FormGroup({
      postTitle: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      postBody: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  toggleForm(open: boolean) {
    if (open) {
      $('#addDiv').removeClass('move-right');
      $('#addDiv').removeClass('fade-in');
      $('#addDiv').addClass('move-right');
      setTimeout(() => {
        this.formVisible = true;
        setTimeout(() => {
          $('#formsDiv').removeClass('move-up');
          $('#formsDiv').addClass('move-up');
          $('#formsDiv').css('opacity', '1');
        }, 100);
      }, 400);
      return;
    }
    // close
    this.submitted = false;
    $('#formsDiv').removeClass('fade-out');
    $('#formsDiv').addClass('fade-out');
    setTimeout(() => {
      this.formVisible = false;
    }, 400);
  }

  filterPosts() {
    this.filtered = !this.filtered;
    this.applyFilter.emit(this.filtered);
  }

  cancel() {
    if (this.isUpdating) {
      this.closeForm.emit();
      return;
    }
    this.toggleForm(false);
  }

  updatePost() {
    let updatedPost = this.post;
    updatedPost.title = this.pf.postTitle.value;
    updatedPost.body = this.pf.postBody.value;
    this.postService.updatePost(updatedPost);
    this.closeForm.emit();
  }

  onSubmit() {
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    }
    if (this.isUpdating) {
      this.updatePost();
      return;
    }
    let newPost = new Post(
      this.user?.id,
      this.pf.postTitle.value,
      this.pf.postBody.value
    );
    this.postService.addPost(newPost);
    this.submitted = false;
    this.postForm.reset();
    this.toggleForm(false);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
