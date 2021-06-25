import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { ModalService } from 'src/app/shared/services/modal.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  private postsSubscription: Subscription;
  public posts: Post[];
  public filterPosts: boolean;

  constructor(
    private postService: PostService,
    private modalService: ModalService
  ) {
    this.posts = [];
    this.filterPosts = false;
  }

  ngOnInit(): void {
    this.posts = this.postService.posts;
    this.postsSubscription = this.postService.postsChanged$.subscribe(
      (posts) => {
        this.posts = posts;
      }
    );
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

  applyFilter(event: boolean) {
    this.filterPosts = event;
  }
}
