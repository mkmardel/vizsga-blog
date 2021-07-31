import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnPostsPipe } from './pipes/own-posts.pipe';

@NgModule({
  declarations: [OwnPostsPipe],
  imports: [CommonModule],
  exports: [OwnPostsPipe],
})
export class SharedModule {}
