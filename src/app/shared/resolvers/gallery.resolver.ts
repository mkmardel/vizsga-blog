import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Album } from '../models/album';
import { GalleryService } from '../services/gallery.service';

@Injectable({
  providedIn: 'root',
})
export class GalleryResolver implements Resolve<Album[]> {
  constructor(private galleryService: GalleryService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Album[]> | Album[] {
    const albums = this.galleryService.albums;
    if (albums.length === 0) {
      return this.galleryService.fetchAlbums();
    }
    return albums;
  }
}
