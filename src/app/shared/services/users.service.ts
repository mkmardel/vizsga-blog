import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Constants } from 'src/app/constants';
import { map, tap } from 'rxjs/operators';
import { ModalService } from './modal.service';
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
  constructor(private http: HttpClient, private modalService: ModalService) {
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
            user.email === 'Sincere@april.biz' ? 'admin' : 'user'
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
}
