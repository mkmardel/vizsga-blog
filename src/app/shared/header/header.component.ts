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

  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private router: Router
  ) {
    this.title = 'Blogtoday';
    this.loggedIn = false;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getStoredUser();
    this.loggedIn = this.currentUser != null;

    this.authService.userStateChanged$.subscribe((user) => {
      this.loggedIn = user != null;
      if (this.loggedIn) {
        this.modalService.loginModalSubject$.next({ open: false });
        $('.navbar-collapse').collapse('hide');
      }
      if (!user) {
        this.router.navigate(['/']);
      }
    });
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
