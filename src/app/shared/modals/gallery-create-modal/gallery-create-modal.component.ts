import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Album } from '../../models/album';
import { Photo } from '../../models/photo';
import { GalleryService } from '../../services/gallery.service';
import { ModalService } from '../../services/modal.service';
declare var $: any;

@Component({
  selector: 'app-gallery-create-modal',
  templateUrl: './gallery-create-modal.component.html',
  styleUrls: ['./gallery-create-modal.component.scss'],
})
export class GalleryCreateModalComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public commonForm: FormGroup;
  public photoForm: FormGroup;
  public submitted: boolean;
  public isLoading: boolean;
  public isAlbumCreate: boolean;
  private id: number;
  private role: string;

  constructor(
    private modalService: ModalService,
    private galleryService: GalleryService
  ) {
    this.submitted = false;
    this.isLoading = false;
    this.isAlbumCreate = true;
  }

  ngOnInit(): void {
    this.initForms();
    this.modalService.GalleryCreateModalState.subscribe((state) => {
      this.id = state.id;
      this.role = state.role;
      this.isAlbumCreate = this.role == 'album';
      this.clearForms();
      $('#galleryCreateModal').modal('show');
    });
    this.subscription = this.galleryService.albumsFetched$.subscribe(() => {
      this.isLoading = false;
      this.close();
    });
  }

  initForms() {
    this.commonForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
    this.photoForm = new FormGroup({
      url: new FormControl('', [Validators.required]),
    });
  }

  get cf() {
    return this.commonForm.controls;
  }
  get pf() {
    return this.photoForm.controls;
  }

  clearForms() {
    this.submitted = false;
    this.commonForm.reset();
    this.photoForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.cf.invalid || (!this.isAlbumCreate && this.pf.invalid)) {
      return;
    }
    this.isLoading = true;
    if (this.isAlbumCreate) {
      return this.submitAlbum();
    }
    this.submitImage();
  }

  submitAlbum() {
    let newAlbum = new Album(this.id, null, this.cf.title.value);
    this.galleryService.addAlbum(newAlbum);
  }

  submitImage() {
    let newImage = new Photo(
      this.id,
      null,
      this.cf.title.value,
      this.pf.url.value,
      this.pf.url.value
    );
    this.galleryService.addImage(newImage);
  }

  close() {
    $('#galleryCreateModal').modal('hide');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
