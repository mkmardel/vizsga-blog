import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { listType1 } from 'src/app/shared/animations/ListAnimations';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post.service';
declare var $: any;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  animations: listType1,
})
export class PostListComponent implements OnInit, AfterViewInit, OnDestroy {
  private postsSubscription: Subscription;
  private viewSubscription: Subscription;
  public posts: Post[];
  public filterPosts: boolean;
  public divId: number;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.posts = [];
    this.filterPosts = false;
  }

  ngOnInit(): void {
    this.posts = this.postService.posts;
    this.postsSubscription = this.postService.postsChanged$.subscribe(
      (posts) => {
        this.posts = [...posts];
      }
    );
  }

  ngAfterViewInit(): void {
    this.viewSubscription = this.route.params.subscribe((params) => {
      this.divId = params['id'];
      if (this.divId) {
        this.scrollToDiv();
      }
    });
  }

  scrollToDiv() {
    setTimeout(() => {
      $('html, body').animate(
        {
          scrollTop: $('#post' + this.divId).offset().top - 100,
        },
        0
      );
      setTimeout(() => {
        $('#post' + this.divId).addClass('highlighted');
      }, 500);
    }, 1000);
  }

  applyFilter(event: boolean) {
    this.filterPosts = event;
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
    this.viewSubscription?.unsubscribe();
  }
}
