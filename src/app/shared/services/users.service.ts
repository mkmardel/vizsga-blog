import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Constants } from 'src/app/constants';
import { map, tap } from 'rxjs/operators';

const API_URL: string = Constants.BASE_API_URL;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _users: User[];
  constructor(private http: HttpClient) {
    this._users = [];
  }

  get users() {
    return this._users;
  }

  fetchUsers() {
    return this.http.get<User[]>(`${API_URL}/users`).pipe(
      map((users) => {
        return users.map((user: User) => {
          return new User(
            user.id,
            user.username,
            user.name,
            user.email,
            user.id % 3 === 0 ? 'admin' : 'user'
          );
        });
      }),
      tap((users) => {
        this._users = users;
      })
    );
  }
}
