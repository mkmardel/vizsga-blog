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
import { PostCreateComponent } from './views/post-list/post-create/post-create.component';
import { CommentSummaryComponent } from './views/comment-summary/comment-summary.component';
import { CommentCardComponent } from './views/comment-summary/comment-card/comment-card.component';
import { GalleryComponent } from './views/gallery/gallery.component';
import { UsersComponent } from './views/users/users.component';
import { UserListComponent } from './views/users/user-list/user-list.component';
import { UserItemComponent } from './views/users/user-item/user-item.component';
import { UserSelectComponent } from './views/users/user-select/user-select.component';
import { GalleryItemComponent } from './views/gallery/gallery-item/gallery-item.component';
import { GalleryModalComponent } from './shared/modals/gallery-modal/gallery-modal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { OwnPostsPipe } from './shared/pipes/own-posts.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AccountComponent } from './views/account/account.component';
import { GalleryCreateModalComponent } from './shared/modals/gallery-create-modal/gallery-create-modal.component';

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
    PostCreateComponent,
    CommentSummaryComponent,
    CommentCardComponent,
    GalleryComponent,
    UsersComponent,
    UserListComponent,
    UserItemComponent,
    UserSelectComponent,
    GalleryItemComponent,
    GalleryModalComponent,
    OwnPostsPipe,
    AccountComponent,
    GalleryCreateModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
