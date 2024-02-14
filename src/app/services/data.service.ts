import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private selectedUserSubject = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  constructor() {}

  selectUser(user: User): void {
    this.selectedUserSubject.next(user);
  }

  notifyUserAdd(newUser: User): void {
    this.selectedUserSubject.next(newUser);

  }

  notifyUserUpdate(updatedUser: User): void {
    this.selectedUserSubject.next(updatedUser);

  }
}