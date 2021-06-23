import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public loggedIn: boolean;
  public username: string;
  private subscription: Subscription;
  private currentUser: User;

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {
    this.loggedIn = false;
  }

  ngOnInit(): void {
    this.setUserData(this.authService.userState);
    this.subscription = this.authService.userStateChanged$.subscribe((user) => {
      this.setUserData(user);
    });
  }

  setUserData(user: User) {
    this.currentUser = user;
    this.loggedIn = this.currentUser != null;
    if (this.currentUser != null) {
      this.username = this.currentUser.username;
    }
  }

  login() {
    this.modalService.loginModalSubject$.next({ open: true });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
