import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginModalComponent } from './shared/modals/login-modal/login-modal.component';
import { AlertModalComponent } from './shared/modals/alert-modal/alert-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { PostListComponent } from './views/post-list/post-list.component';
import { HomeComponent } from './views/home/home.component';
import { PostItemComponent } from './views/post-list/post-item/post-item.component';
import { CommentItemComponent } from './views/comment-list/comment-item/comment-item.component';
import { CommentListComponent } from './views/comment-list/comment-list.component';
import { LoadingModalComponent } from './shared/modals/loading-modal/loading-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginModalComponent,
    AlertModalComponent,
    NotFoundComponent,
    PostListComponent,
    HomeComponent,
    PostItemComponent,
    CommentItemComponent,
    CommentListComponent,
    LoadingModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
