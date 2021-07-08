import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from 'src/app/constants';
import { Comment } from '../models/comment';
import { ModalService } from './modal.service';
import { HttpHeaders } from '@angular/common/http';

const API_URL = Constants.BASE_API_URL;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

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
      .post<Comment>(
        `${API_URL}/comments`,
        newComment.commentToObject(),
        httpOptions
      )
      .subscribe(
        (comment) => {
          //A JSON placeholder mindig 501-es id-t ad vissza
          comment.id = this.comments.length + 1;

          this.comments.push(comment);
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
    /**
     * Egy újonnan hozzáadott komment ID-ja 500-nál nagyobb lenne, de a
     * JSON placeholder API valójában nem hoz létre új kommentet.
     * Így viszont HTTP Error lenne 500-nál nagyobb ID esetén.
     */
    let redefinedId = updatedComment.id > 500 ? 500 : updatedComment.id;

    this.http
      .put<Comment>(
        `${API_URL}/comments/${redefinedId}`,
        updatedComment,
        httpOptions
      )
      .subscribe(
        (comment) => {
          let index = this.comments.indexOf(updatedComment);
          this.comments[index] = updatedComment;
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
    /**
     * Egy újonnan hozzáadott komment ID-ja 500-nál nagyobb lenne, de a
     * JSON placeholder API valójában nem hoz létre új kommentet.
     * Így viszont HTTP Error lenne 500-nál nagyobb ID esetén.
     */
    let redefinedId = id > 500 ? 500 : id;

    this.http
      .delete(`${API_URL}/comments/${redefinedId}`, httpOptions)
      .subscribe(
        () => {
          let index = this.comments.findIndex((comment) => comment.id == id);
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
}
