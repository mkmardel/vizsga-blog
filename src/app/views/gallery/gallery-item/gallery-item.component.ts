import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { Album } from 'src/app/shared/models/album';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GalleryService } from 'src/app/shared/services/gallery.service';
import { ModalService } from 'src/app/shared/services/modal.service';
declare var $: any;

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss'],
})
export class GalleryItemComponent implements OnInit {
  @Input() album: Album;
  @ViewChild('group') btnGroup: ElementRef;
  public userName: string;
  public isDeleting: boolean;

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private galleryService: GalleryService
  ) {
    this.isDeleting = false;
  }

  ngOnInit(): void {
    this.userName = this.authService.userState.name;
  }

  open() {
    this.modalService.showGalleryModal(true, this.album.id);
  }

  deleteAlbum() {
    this.modalService.ConfirmState.pipe(take(1)).forEach((state) => {
      this.showSpinner();
      if (state.action == 'delete_album') {
        this.galleryService.deleteAlbum(this.album.id);
      }
    });
    this.modalService.showAlertModal(
      'Biztosan törölni szeretnéd ezt az albumot?',
      'delete_album',
      'confirm'
    );
  }

  addImage() {
    this.modalService.galleryCreateModalSubject$.next({
      role: 'image',
      id: this.album.id,
    });
  }

  toggleMenu() {
    this.btnGroup.nativeElement.classList.toggle('visible');
  }

  showSpinner() {
    this.isDeleting = true;
    // response error offset
    setTimeout(() => {
      this.isDeleting = false;
    }, 10000);
  }
}
