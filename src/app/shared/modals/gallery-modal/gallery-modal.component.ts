import { Component, OnInit } from '@angular/core';
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

  constructor(
    private modalService: ModalService,
    private galleryService: GalleryService
  ) {
    this.isLoading = false;
    this.currentIndex = 0;
    this.images = [];
  }

  ngOnInit(): void {
    this.modalService.GalleryModalState.subscribe((data) => {
      this.albumId = data?.albumId;
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
}
