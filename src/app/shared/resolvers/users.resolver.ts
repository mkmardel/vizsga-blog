import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<User[]> {
  constructor(private usersService: UsersService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> | User[] {
    const users = this.usersService.users;
    if (users.length === 0) {
      return this.usersService.fetchUsers();
    }
    return users;
  }
}
