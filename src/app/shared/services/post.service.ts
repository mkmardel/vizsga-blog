import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from 'src/app/constants';
import { Post } from '../models/post';
import { ModalService } from './modal.service';

const API_URL = Constants.BASE_API_URL;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _posts: Post[];
  public postsChanged$: Subject<Post[]>;

  constructor(private http: HttpClient, private modalService: ModalService) {
    this._posts = [];
    this.postsChanged$ = new Subject<Post[]>();
  }

  get posts() {
    return this._posts;
  }

  fetchPosts() {
    this.modalService.showLoadingModal(true, 'Posztok betöltése...');
    return this.http.get<Post[]>(`${API_URL}/posts`).pipe(
      tap((posts) => {
        this._posts = posts.sort((a, b) => <any>b.id - a.id);
        this.postsChanged$.next(this.posts);
      })
    );
  }

  addPost(newPost: Post) {
    this.http
      .post<Post>(`${API_URL}/posts`, newPost.postToObject(), httpOptions)
      .subscribe((post) => {
        this.posts.unshift(post);
        this.postsChanged$.next(this.posts);
        this.modalService.showAlertModal(
          'Sikeresen létrehoztál egy új bejegyzést!',
          null,
          'success'
        );
      });
  }

  updatePost(updatedPost: Post) {
    /**
     * Egy újonnan hozzáadott poszt ID-ja 100-nál nagyobb lenne, de a
     * JSON placeholder API valójában nem hoz létre új posztot.
     * Így viszont HTTP Error lenne 100-nál nagyobb ID esetén.
     */
    let redefinedId = updatedPost.id > 100 ? 100 : updatedPost.id;

    this.http
      .put<Post>(`${API_URL}/posts/${redefinedId}`, updatedPost, httpOptions)
      .subscribe((post) => {
        let index = this.posts.indexOf(updatedPost);
        this.posts[index] = updatedPost;
        this.postsChanged$.next(this.posts);
        this.modalService.showAlertModal(
          'Sikeresen módosítottad a bejegyzést!',
          null,
          'success'
        );
      });
  }

  deletePost(id: number) {
    /**
     * Egy újonnan hozzáadott poszt ID-ja 100-nál nagyobb lenne, de a
     * JSON placeholder API valójában nem hoz létre új posztot.
     * Így viszont HTTP Error lenne 100-nál nagyobb ID esetén.
     */
    let redefinedId = id > 100 ? 100 : id;

    this.http
      .delete(`${API_URL}/posts/${redefinedId}`, httpOptions)
      .subscribe(() => {
        let index = this.posts.findIndex((post) => post.id == id);
        this.posts.splice(index, 1);
        this.postsChanged$.next(this.posts);
      });
  }
}
