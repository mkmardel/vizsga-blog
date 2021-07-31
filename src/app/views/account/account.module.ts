import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RouterModule, Routes } from '@angular/router';

let routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
];

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, ImageCropperModule, RouterModule.forChild(routes)],
})
export class AccountModule {}
