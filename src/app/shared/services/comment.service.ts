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
  commentChanged$: Subject<Comment[]>;

  constructor(private http: HttpClient, private modalService: ModalService) {
    this._comments = [];
    this.commentChanged$ = new Subject<Comment[]>();
  }

  get comments() {
    return this._comments;
  }

  fetchComments() {
    this.modalService.showLoadingModal(true, 'Kommentek betöltése...');
    return this.http.get<Comment[]>(`${API_URL}/comments`).pipe(
      tap((comments) => {
        this._comments = comments;
        this.commentChanged$.next(comments);
      })
    );
  }
}
