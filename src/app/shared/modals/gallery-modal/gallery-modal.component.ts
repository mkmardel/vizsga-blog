import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Photo } from '../../models/photo';
import { GalleryService } from '../../services/gallery.service';
import { ModalService } from '../../services/modal.service';
declare var $: any;

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss'],
})
export class GalleryModalComponent implements OnInit {
  public albumId: number | null;
  public images: Photo[];
  public currentIndex: number;
  public isLoading: boolean;
  public isDeleting: boolean;
  public confirmation: boolean;

  constructor(
    private modalService: ModalService,
    private galleryService: GalleryService
  ) {
    this.isLoading = false;
    this.currentIndex = 0;
    this.images = [];
    this.isDeleting = false;
    this.confirmation = false;
  }

  ngOnInit(): void {
    this.modalService.GalleryModalState.subscribe((data) => {
      this.albumId = data?.albumId;
      this.currentIndex = 0;
      $('#galleryModal').modal('show');

      if (this.albumId) {
        this.isLoading = true;
        this.galleryService.fetchPhotos(this.albumId).subscribe(
          (photos) => {
            this.images = photos;
            this.isLoading = false;
          },
          (err) => {
            this.modalService.showAlertModal(
              `Hiba! ${err.message}`,
              null,
              'error'
            );
            this.isLoading = false;
          }
        );
      }
    });
  }

  left() {
    this.confirmation = false;
    $('#mainImage').removeClass('fade-in');
    $('#mainImage').addClass('fade-out');
    setTimeout(() => {
      if (this.currentIndex > 0) {
        $('#mainImage').removeClass('fade-out');
        $('#mainImage').addClass('fade-in');
        this.currentIndex--;
      }
    }, 200);
  }

  right() {
    this.confirmation = false;
    $('#mainImage').removeClass('fade-in');
    $('#mainImage').addClass('fade-out');
    setTimeout(() => {
      if (this.currentIndex < this.images.length - 1) {
        $('#mainImage').removeClass('fade-out');
        $('#mainImage').addClass('fade-in');
        this.currentIndex++;
      }
    }, 200);
  }

  close() {
    this.albumId = null;
    $('#galleryModal').modal('hide');
  }

  deleteImage(index: number) {
    this.confirmation = false;
    this.showSpinner();
    let photoId = this.images[index].id;
    this.galleryService.deleteImage(photoId).subscribe(
      (res) => {
        this.images.splice(index, 1);
        this.currentIndex = index == 0 ? 0 : index - 1;
        this.isDeleting = false;
      },
      (err) => {
        this.isDeleting = false;
        this.modalService.showAlertModal(err.message, null, 'error');
      }
    );
  }

  showSpinner() {
    this.isDeleting = true;
    // response error offset
    setTimeout(() => {
      this.isDeleting = false;
    }, 10000);
  }
}
