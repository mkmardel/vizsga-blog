import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Constants } from 'src/app/constants';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

const API_URL: string = Constants.BASE_API_URL;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _users: User[];
  public usersChanged$: Subject<User[]>;
  constructor(private http: HttpClient) {
    this._users = [];
    this.usersChanged$ = new Subject<User[]>();
  }

  get users() {
    return this._users;
  }

  fetchUsers() {
    //this.modalService.showLoadingModal(true, 'Felhasználók betöltése...');
    return this.http.get<User[]>(`${API_URL}/users`).pipe(
      map((users) => {
        return users.map((user: User) => {
          return new User(
            user.id,
            user.username,
            user.name,
            user.email,
            user.email === 'Sincere@april.biz' ? 'admin' : 'user',
            user.imageUrl
          );
        });
      }),
      tap((users) => {
        this._users = users;
        this.usersChanged$.next(users);
      })
    );
  }

  addUser(newUserObj: any) {
    return this.http.post<User>(`${API_URL}/users`, newUserObj, httpOptions);
  }

  uploadUserImage(formData: any) {
    return this.http.post<any>(`${API_URL}/users/image`, formData);
  }

  async setUserImage(id: number, url: string) {
    if (this._users?.length == 0) {
      await this.fetchUsers().toPromise();
    }

    let index = this._users.findIndex((user) => user.id == id);
    this._users[index].imageUrl = url;
    localStorage.setItem(
      'currentUser',
      JSON.stringify(this._users[index].userToObject())
    );
  }

  async reloadUserImage(id: number) {
    if (this._users?.length == 0) {
      await this.fetchUsers().toPromise();
    }
    let index = this._users.findIndex((user) => user.id == id);
    localStorage.setItem(
      'currentUser',
      JSON.stringify(this._users[index].userToObject())
    );
    this.usersChanged$.next(this.users);
  }

  removeUserAndData(id: number) {
    return this.http.delete(`${API_URL}/users/${id}`, httpOptions);
  }
}
