import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/shared/models/album';
import { GalleryService } from 'src/app/shared/services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  albums: Album[];

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.albums = this.galleryService.albums;
  }
}
