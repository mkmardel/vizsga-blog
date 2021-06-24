import { Component, OnInit } from '@angular/core';
import { auditTime } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CommentService } from '../../services/comment.service';
import { PostService } from '../../services/post.service';
import { UsersService } from '../../services/users.service';
declare var $: any;

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss'],
})
export class LoadingModalComponent implements OnInit {
  title: string;

  constructor(
    private modalService: ModalService,
    private postService: PostService,
    private commentService: CommentService,
    private usersService: UsersService
  ) {
    this.title = '';
  }

  ngOnInit(): void {
    this.modalService.LoadingModalState.subscribe((data) => {
      this.title = data.title ? data.title : 'Kérlek várj...';
      $('#loadingModal').modal('show');
      setTimeout(() => {
        this.close();
      }, 5000);
    });

    this.postService.postsChanged$.pipe(auditTime(500)).subscribe(() => {
      this.close();
    });
    this.commentService.commentsChanged$.pipe(auditTime(500)).subscribe(() => {
      this.close();
    });
    this.usersService.usersChanged$.pipe(auditTime(500)).subscribe(() => {
      this.close();
    });
  }

  close() {
    this.title = '';
    $('#loadingModal').modal('hide');
  }
}
