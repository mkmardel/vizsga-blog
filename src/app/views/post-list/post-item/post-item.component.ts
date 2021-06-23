import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  showComments: boolean;
  userName: string;

  constructor(private userService: UsersService) {
    this.showComments = false;
  }

  ngOnInit(): void {
    this.userName = this.userService.users.find(
      (user) => user.id == this.post.userId
    ).name;
  }

  loadComments() {
    this.showComments = !this.showComments;
  }
}
