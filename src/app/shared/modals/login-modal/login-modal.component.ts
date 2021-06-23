import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalService } from 'src/app/shared/services/modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {
    this.submitted = false;
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.modalService.LoginModalState.subscribe((state) => {
      $('#loginModal').modal(state.open ? 'show' : 'hide');
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      remember: new FormControl(true),
    });
  }

  get lf() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.submitted) {
      this.authService
        .login(
          this.lf.email.value,
          this.lf.password.value,
          this.lf.remember.value
        )
        .then(
          (res) => {
            this.isLoading = false;
            if (!res) {
              this.modalService.showAlertModal(
                'A megadott jelszó helytelen.',
                null,
                'error'
              );
              return;
            }
            this.authService.userStateChanged.next(res);
            console.log(res);
          },
          (err) => {
            this.isLoading = false;
            this.modalService.showAlertModal(err.message, null, 'error');
          }
        );
    }
  }

  close() {
    $('#loginModal').modal('hide');
  }
}
