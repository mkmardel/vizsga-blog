import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    this.http.post<Post>(`${API_URL}/posts`, newPost.postToObject()).subscribe(
      (postData) => {
        this.posts.unshift(postData);
        this.postsChanged$.next(this.posts);
        this.modalService.showAlertModal(
          'Sikeresen létrehoztál egy új bejegyzést!',
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

  updatePost(updatedPost: Post) {
    this.http
      .put<Post>(`${API_URL}/posts/${updatedPost.id}`, updatedPost)
      .subscribe(
        (postData) => {
          let index = this.posts.findIndex((post) => post.id === postData.id);
          this.posts[index] = postData;
          this.postsChanged$.next(this.posts);
          this.modalService.showAlertModal(
            'Sikeresen módosítottad a bejegyzést!',
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

  deletePost(id: number) {
    this.http.delete<{ id: number }>(`${API_URL}/posts/${id}`).subscribe(
      (res) => {
        let index = this.posts.findIndex((post) => post.id == res.id);
        this.posts.splice(index, 1);
        this.postsChanged$.next(this.posts);
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
