import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from 'src/app/constants';
import { Post } from '../models/post';
import { ModalService } from './modal.service';

const API_URL = Constants.BASE_API_URL;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _posts: Post[];
  public postsChanged: Subject<Post[]>;

  constructor(private http: HttpClient, private modalService: ModalService) {
    this._posts = [];
    this.postsChanged = new Subject<Post[]>();
  }

  get posts() {
    return this._posts;
  }

  fetchPosts() {
    return this.http.get<Post[]>(`${API_URL}/posts`).pipe(
      tap((posts) => {
        this._posts = posts;
        this.postsChanged.next(this.posts);
      })
    );
  }
}
