import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/shared/models/album';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss'],
})
export class GalleryItemComponent implements OnInit {
  @Input() album: Album;
  public userName: string;

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
