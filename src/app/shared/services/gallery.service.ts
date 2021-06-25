import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constants } from 'src/app/constants';
import { Album } from '../models/album';
import { Photo } from '../models/photo';
import { AuthService } from './auth.service';
import { ModalService } from './modal.service';

const API_URL = Constants.BASE_API_URL;

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
}
