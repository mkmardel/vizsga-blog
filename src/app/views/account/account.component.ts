import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  private imageSubscription: Subscription;
  public loggedInUser: User;
  public imageChangedEvent: any;
  public croppedImage: any;
  public showCropper: boolean;
  public isLoading: boolean;
  public isDeleting: boolean;

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private usersService: UsersService
  ) {
    this.showCropper = false;
    this.isLoading = false;
    this.isDeleting = false;
  }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getStoredUser();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    this.showCropper = true;
  }
  loadImageFailed() {
    this.modalService.showAlertModal(
      'Hiba a kép betöltése során.',
      null,
      'error'
    );
  }

  closeAccount() {
    this.modalService.ConfirmState.pipe(take(1)).forEach((state) => {
      this.isDeleting = true;
      if (state.action == 'close_account') {
        this.usersService.removeUserAndData(this.loggedInUser.id).subscribe(
          (res) => {
            this.authService.logout();
          },
          (err) => {
            this.isDeleting = false;
            this.modalService.showAlertModal(err.message, null, 'error');
          }
        );
      }
    });
    this.modalService.showAlertModal(
      'Biztosan törölni szeretnéd a fiókodat? A kért művelet nem vonható vissza!',
      'close_account',
      'confirm'
    );
  }

  async saveImage() {
    if (!this.croppedImage) {
      return;
    }
    this.isLoading = true;
    const base64Response = await fetch(this.croppedImage);
    const blob = await base64Response.blob();
    const formData = new FormData();
    formData.append('avatar', blob, `user${this.loggedInUser.id}`);
    this.imageSubscription = this.usersService
      .uploadUserImage(formData)
      .subscribe(
        (url) => {
          this.showCropper = false;
          this.loggedInUser.imageUrl = url;
          this.usersService.setUserImage(this.loggedInUser.id, url);
          this.modalService.showAlertModal(
            'Sikeres feltöltés! A új kép cseréje eltarthat néhány másodpercig.',
            null,
            'success'
          );
          setTimeout(() => {
            window.location.reload();
            this.isLoading = false;
          }, 5000);
        },
        (err) => {
          this.isLoading = false;
          this.modalService.showAlertModal(err.message, null, 'error');
        }
      );
  }

  ngOnDestroy(): void {
    this.imageSubscription?.unsubscribe();
  }
}
