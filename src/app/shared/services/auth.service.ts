import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { User } from '../models/user';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userState: User;
  public userStateChanged: Subject<User>;
  private users: User[];

  constructor(private usersService: UsersService) {
    this.userStateChanged = new Subject<User>();
  }

  get userState() {
    return this._userState;
  }

  getStoredUser(): User {
    let userLoggedIn = localStorage.getItem('remember');
    if (userLoggedIn != null) {
      this._userState = JSON.parse(localStorage.getItem('currentUser'));
    }
    return this.userState;
  }

  login(
    email: string,
    pwd: string,
    remember: boolean = false
  ): Promise<User | null> {
    return new Promise<User | null>(async (resolve, reject) => {
      this.users = await this.getUsersList();
      this._userState = this.users.find(
        (user) => user.email == email && user.name == pwd
      );
      if (this.userState && remember) {
        localStorage.setItem('remember', 'true');
        localStorage.setItem(
          'currentUser',
          JSON.stringify(this.userState.userToObject())
        );
      }
      resolve(this.userState);
    });
  }

  logout() {
    this._userState = null;
    localStorage.removeItem('remember');
    localStorage.removeItem('currentUser');
    this.userStateChanged.next(this.userState);
  }

  async getUsersList(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      this.usersService.fetchUsers().subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
