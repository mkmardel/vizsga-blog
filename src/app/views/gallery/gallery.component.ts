import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/shared/models/album';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GalleryService } from 'src/app/shared/services/gallery.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  public albums: Album[];
  private loggedInUser: User;

  constructor(
    private galleryService: GalleryService,
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.albums = this.galleryService.albums;
    this.loggedInUser = this.authService.getStoredUser();
  }

  createAlbum() {
    this.modalService.galleryCreateModalSubject$.next({
      role: 'album',
      id: this.loggedInUser.id,
    });
  }
}
