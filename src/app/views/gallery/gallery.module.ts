import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery.component';
import { GalleryItemComponent } from './gallery-item/gallery-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GalleryModalComponent } from 'src/app/shared/modals/gallery-modal/gallery-modal.component';
import { GalleryCreateModalComponent } from 'src/app/shared/modals/gallery-create-modal/gallery-create-modal.component';

let routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
  },
];

@NgModule({
  declarations: [
    GalleryComponent,
    GalleryItemComponent,
    GalleryModalComponent,
    GalleryCreateModalComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class GalleryModule {}
