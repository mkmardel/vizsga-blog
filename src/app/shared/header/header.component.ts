import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
import { GalleryService } from '../services/gallery.service';
import { ModalService } from '../services/modal.service';
import { UsersService } from '../services/users.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
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

  private userStateSubscription: Subscription;
  private usersSubscription: Subscription;
  private currentUser: User;
  public title: string;
  public loggedIn: boolean;
  public isAdmin: boolean;
  public username: string;
  public imageUrl: string;

  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private router: Router,
    private galleryService: GalleryService,
    private commentService: CommentService,
    private usersService: UsersService
  ) {
    this.title = 'Blogtoday';
    this.loggedIn = false;
    this.isAdmin = false;
    this.username = '';
    this.imageUrl = '';
  }

  ngOnInit(): void {
    this.setRoles(this.authService.getStoredUser());

    this.userStateSubscription = this.authService.userStateChanged$.subscribe(
      (user) => {
        this.setRoles(user);
        if (this.loggedIn) {
          this.modalService.loginModalSubject$.next({ open: false });
          $('.navbar-collapse').collapse('hide');
        }
        if (!user) {
          this.galleryService.clearGallery();
          this.commentService.clearComments();
          this.router.navigate(['/']);
        }
      }
    );

    this.usersSubscription = this.usersService.usersChanged$.subscribe(() => {
      this.imageUrl = this.authService.getUserImage();
    });
  }

  setRoles(user: User) {
    this.currentUser = user;
    this.loggedIn = this.currentUser != null;
    this.username = this.currentUser?.username;
    this.imageUrl = this.currentUser?.imageUrl;
    this.isAdmin = this.currentUser?.role == 'admin';
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

  ngOnDestroy(): void {
    this.userStateSubscription?.unsubscribe();
    this.usersSubscription?.unsubscribe();
  }
}
