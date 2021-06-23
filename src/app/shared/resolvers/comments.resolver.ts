import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsResolver implements Resolve<Comment[]> {
  constructor(private commentService: CommentService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Comment[]> | Comment[] {
    const comments = this.commentService.comments;
    if (comments.length === 0) {
      return this.commentService.fetchComments();
    }
    return comments;
  }
}
