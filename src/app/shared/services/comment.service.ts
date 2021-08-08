import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from 'src/app/constants';
import { Comment } from '../models/comment';
import { ModalService } from './modal.service';
import { HttpHeaders } from '@angular/common/http';

const API_URL = Constants.BASE_API_URL;

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private _comments: Comment[];
  public commentsChanged$: Subject<Comment[]>;

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
    this.http
      .post<Comment>(`${API_URL}/comments`, newComment.commentToObject())
      .subscribe(
        (commentData) => {
          this.comments.push(commentData);
          this.commentsChanged$.next(this.comments);
        },
        (err) => {
          this.modalService.showAlertModal(
            `Hiba történt! (${err.message})`,
            null,
            'error'
          );
        }
      );
  }

  updateComment(updatedComment: Comment) {
    this.http
      .put<Comment>(`${API_URL}/comments/${updatedComment.id}`, updatedComment)
      .subscribe(
        (commentData) => {
          let index = this.comments.findIndex(
            (comment) => comment.id === commentData.id
          );
          this.comments[index] = commentData;
          this.commentsChanged$.next(this.comments);
          this.modalService.showAlertModal(
            'Sikeresen módosítottad a kommentet!',
            null,
            'success'
          );
        },
        (err) => {
          this.modalService.showAlertModal(
            `Hiba történt! (${err.message})`,
            null,
            'error'
          );
        }
      );
  }

  deleteComment(id: number) {
    this.http.delete<{ id: number }>(`${API_URL}/comments/${id}`).subscribe(
      (res) => {
        let index = this.comments.findIndex((comment) => comment.id == res.id);
        this.comments.splice(index, 1);
        this.commentsChanged$.next(this.comments);
      },
      (err) => {
        this.modalService.showAlertModal(
          `Hiba történt! (${err.message})`,
          null,
          'error'
        );
      }
    );
  }

  clearComments() {
    this._comments = [];
  }
}
