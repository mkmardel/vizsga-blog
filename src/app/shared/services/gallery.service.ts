import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from 'src/app/constants';
import { Album } from '../models/album';
import { Photo } from '../models/photo';
import { AuthService } from './auth.service';
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
export class GalleryService {
  private _albums: Album[];
  public albumsFetched$: Subject<Album[]>;

  constructor(
    private http: HttpClient,
    private modalService: ModalService,
    private authService: AuthService
  ) {
    this._albums = [];
    this.albumsFetched$ = new Subject<Album[]>();
  }

  get albums() {
    return this._albums;
  }

  fetchAlbums() {
    let userId = this.authService.userState.id.toString();
    let params = new HttpParams();
    params = params.append('userId', userId);

    this.modalService.showLoadingModal(true, 'Albumok betöltése...');
    return this.http.get<Album[]>(`${API_URL}/albums`, { params: params }).pipe(
      tap((albums) => {
        this._albums = albums;
        this.albumsFetched$.next(albums);
      })
    );
  }

  fetchPhotos(id: number) {
    let params = new HttpParams();
    params = params.append('albumId', id?.toString());

    return this.http.get<Photo[]>(`${API_URL}/photos`, { params: params });
  }

  deleteAlbum(id: number) {
    this.http.delete(`${API_URL}/albums/${id}`, httpOptions).subscribe(
      (res) => {
        let index = this._albums.findIndex((album) => album.id == id);
        this._albums.splice(index, 1);
        this.albumsFetched$.next(this.albums);
      },
      (err) => {
        this.modalService.showAlertModal(err.message, null, 'error');
      }
    );
  }

  deleteImage(id: number) {
    return this.http.delete(`${API_URL}/photos/${id}`, httpOptions);
  }

  addAlbum(newAlbum: Album) {
    this.http
      .post<Album>(`${API_URL}/albums`, newAlbum.albumToObject(), httpOptions)
      .subscribe(
        (album) => {
          this._albums.push(album);
          this.albumsFetched$.next(this.albums);
        },
        (err) => {
          this.modalService.showAlertModal(err.message, null, 'error');
        }
      );
  }

  addImage(newPhoto: Photo) {
    this.http
      .post<Photo>(`${API_URL}/photos`, newPhoto.photoToObject(), httpOptions)
      .subscribe(
        (photo) => {
          this.albumsFetched$.next(this.albums);
          this.modalService.showAlertModal(
            'Az új kép sikeresen hozzá lett adva az albumhoz.',
            null,
            'success'
          );
        },
        (err) => {
          this.modalService.showAlertModal(err.message, null, 'error');
        }
      );
  }

  clearGallery() {
    this._albums = [];
  }
}
