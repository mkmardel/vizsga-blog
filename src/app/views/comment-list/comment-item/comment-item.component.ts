import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/models/comment';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() comment: Comment;
  isAdmin: boolean;

  constructor(private authService: AuthService) {
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.userState.role == 'admin';
  }
}
