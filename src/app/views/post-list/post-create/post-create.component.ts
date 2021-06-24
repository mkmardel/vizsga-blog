import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';
declare var $: any;

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit, OnDestroy {
  formVisible: boolean;
  submitted: boolean;
  postForm: FormGroup;
  user: User;
  loggedIn: boolean;
  private subscription: Subscription;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {
    this.formVisible = false;
    this.submitted = false;
    this.loggedIn = false;
  }

  ngOnInit(): void {
    this.user = this.authService.userState;
    this.loggedIn = this.user != null;

    this.authService.userStateChanged$.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });

    this.initForm();
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

  onSubmit() {
    this.submitted = true;
    if (this.postForm.invalid) {
      return;
    }
    let id = this.postService.posts.length + 1;
    let newPost = new Post(
      id,
      this.user?.id,
      this.pf.postTitle.value,
      this.pf.postBody.value
    );
    this.postService.addPost(newPost);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
