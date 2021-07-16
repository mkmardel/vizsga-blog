import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/services/modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  public loginForm: FormGroup;
  public submitted: boolean;
  public isLoading: boolean;
  public isRegistration: boolean;

  constructor(
    private authService: AuthService,
    private modalService: ModalService,
    private usersService: UsersService
  ) {
    this.submitted = false;
    this.isLoading = false;
    this.isRegistration = false;
  }

  ngOnInit(): void {
    this.modalService.LoginModalState.subscribe((state) => {
      $('#loginModal').modal(state.open ? 'show' : 'hide');
    });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      remember: new FormControl(true),
      username: new FormControl('', []),
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
      if (!this.isRegistration) {
        return this.login();
      }
      this.register();
    }
  }

  login() {
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
              'A megadott e-mail cím vagy jelszó hibás.',
              null,
              'error'
            );
            return;
          }
          this.authService.userStateChanged$.next(res);
        },
        (err) => {
          this.isLoading = false;
          this.modalService.showAlertModal(err.message, null, 'error');
        }
      );
  }

  register() {
    let userData = {
      email: this.lf.email.value,
      name: this.lf.password.value,
      username: this.lf.username.value,
    };
    this.userSubscription = this.usersService.addUser(userData).subscribe(
      (user) => {
        this.isLoading = false;
        this.isRegistration = true;
        this.switchMode();
        this.modalService.showAlertModal(
          'Sikeres regisztráció!\nBejelentkezni az e-mail címeddel és teljes neveddel tudsz.',
          null,
          'success'
        );
      },
      (res) => {
        this.isLoading = false;
        if (res.status === 401) {
          return this.modalService.showAlertModal(
            res.error.message,
            null,
            'error'
          );
        }
        this.modalService.showAlertModal(res, null, 'error');
      }
    );
  }

  switchMode() {
    this.submitted = false;
    this.isRegistration = !this.isRegistration;
    if (this.isRegistration) {
      this.loginForm.controls['password'].setValue('');
      this.loginForm.controls['username'].setValidators([
        Validators.required,
        Validators.minLength(5),
      ]);
      this.loginForm.controls['username'].updateValueAndValidity();
    }

    if (!this.isRegistration) {
      this.loginForm.controls['username'].clearValidators();
      this.loginForm.controls['username'].updateValueAndValidity();
    }
  }

  close() {
    $('#loginModal').modal('hide');
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
