import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from 'src/app/constants';
import { Comment } from '../models/comment';
import { ModalService } from './modal.service';

const API_URL = Constants.BASE_API_URL;

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _comments: Comment[];
  commentsChanged$: Subject<Comment[]>;

  constructor(private http: HttpClient, private modalService: ModalService) {
    this._comments = [];
    this.commentsChanged$ = new Subject<Comment[]>();
  }

  get comments() {
    return this._comments;
  }

  fetchComments() {
    this.modalService.showLoadingModal(true, 'Kommentek betöltése...');
    return this.http.get<Comment[]>(`${API_URL}/comments`).pipe(
      tap((comments) => {
        this._comments = comments;
        this.commentsChanged$.next(comments);
      })
    );
  }

  addComment(newComment: Comment) {
    this.comments.push(newComment);
    this.commentsChanged$.next(this.comments);
  }

  updateComment(updatedComment: Comment) {
    let index = this.comments.indexOf(updatedComment);
    this.comments[index] = updatedComment;
    this.commentsChanged$.next(this.comments);
    this.modalService.showAlertModal(
      'Sikeresen módosítottad a kommentet!',
      null,
      'success'
    );
  }

  deleteComment(id: number) {
    let index = this.comments.findIndex((comment) => comment.id == id);
    this.comments.splice(index, 1);
    this.commentsChanged$.next(this.comments);
  }
}
