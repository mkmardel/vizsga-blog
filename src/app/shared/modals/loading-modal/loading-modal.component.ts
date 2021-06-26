import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CommentService } from '../../services/comment.service';
import { GalleryService } from '../../services/gallery.service';
import { PostService } from '../../services/post.service';
import { UsersService } from '../../services/users.service';
declare var $: any;

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss'],
})
export class LoadingModalComponent implements OnInit, OnDestroy {
  private subscriptions: Object;
  public title: string;

  constructor(
    private modalService: ModalService,
    private postService: PostService,
    private commentService: CommentService,
    private usersService: UsersService,
    private galleryService: GalleryService
  ) {
    this.title = 'Kérlek várj...';
    this.subscriptions = {};
  }

  ngOnInit(): void {
    this.subscriptions['loading'] =
      this.modalService.LoadingModalState.subscribe((data) => {
        if (!data) {
          this.close();
        }
        this.title = data?.title;
        $('#loadingModal').modal('show');
        setTimeout(() => {
          this.close();
        }, 5000);
      });

    this.subscriptions['posts'] = this.postService.postsChanged$
      .pipe(auditTime(1000))
      .subscribe(() => {
        this.close();
      });
    this.subscriptions['comments'] = this.commentService.commentsChanged$
      .pipe(auditTime(1000))
      .subscribe(() => {
        this.close();
      });
    this.subscriptions['users'] = this.usersService.usersChanged$
      .pipe(auditTime(1000))
      .subscribe(() => {
        this.close();
      });
    this.subscriptions['albums'] = this.galleryService.albumsFetched$
      .pipe(auditTime(1000))
      .subscribe(() => {
        this.close();
      });
  }

  close() {
    this.title = '';
    $('#loadingModal').modal('hide');
  }

  ngOnDestroy(): void {
    for (const [key, value] of Object.entries(this.subscriptions)) {
      if (value) {
        (value as Subscriber<any>).unsubscribe();
      }
    }
  }
}
