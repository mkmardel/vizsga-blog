import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    let offset = window.pageYOffset;

    if (offset <= 150) {
      $('.btn-top').css('display', 'none');
    }
    if (offset >= 150) {
      $('.btn-top').css('display', 'block');
    }
  }

  private currentUser: User;
  public title: string;
  public loggedIn: boolean;
  public isAdmin: boolean;

  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private router: Router
  ) {
    this.title = 'Blogtoday';
    this.loggedIn = false;
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.setRoles(this.authService.getStoredUser());

    this.authService.userStateChanged$.subscribe((user) => {
      this.loggedIn = user != null;
      this.isAdmin = user?.role == 'admin';
      if (this.loggedIn) {
        this.modalService.loginModalSubject$.next({ open: false });
        $('.navbar-collapse').collapse('hide');
      }
      if (!user) {
        this.router.navigate(['/']);
      }
    });
  }

  setRoles(user: User) {
    this.currentUser = user;
    this.loggedIn = this.currentUser != null;
    this.isAdmin = this.currentUser.role == 'admin';
  }

  login() {
    this.modalService.loginModalSubject$.next({ open: true });
  }
  logout() {
    this.authService.logout();
  }

  moveToTop() {
    window.scrollTo(0, 0);
  }
}
