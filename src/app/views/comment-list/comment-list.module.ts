import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommentListComponent, CommentItemComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [CommentListComponent, CommentItemComponent],
})
export class CommentListModule {}
