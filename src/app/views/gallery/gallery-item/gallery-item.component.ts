import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/shared/models/album';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GalleryService } from 'src/app/shared/services/gallery.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss'],
})
export class GalleryItemComponent implements OnInit {
  @Input() album: Album;
  private subscription: Subscription;
  userName: string;

  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.userState.name;
  }

  open() {
    this.modalService.showGalleryModal(true, this.album.id);
  }
}
