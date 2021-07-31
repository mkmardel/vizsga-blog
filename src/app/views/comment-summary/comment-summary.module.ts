import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentSummaryComponent } from './comment-summary.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { RouterModule, Routes } from '@angular/router';

let routes: Routes = [
  {
    path: '',
    component: CommentSummaryComponent,
  },
];

@NgModule({
  declarations: [CommentSummaryComponent, CommentCardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CommentSummaryModule {}
