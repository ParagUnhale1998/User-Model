import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private toastService: ToastService) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
       return [];
      })
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      map((response: User) => {
        this.toastService.showSuccess('User added successfully.');
        return response;
      }),
      catchError((error) => {
        this.toastService.showFailure('Failed to add user.');
       throw error // or return [];
      })
    );
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<User>(url, user).pipe(
      map(() => {
        this.toastService.showSuccess('User updated successfully.');
        return user;
      }),
      catchError((error) => {
        this.toastService.showFailure('Failed to update user.');
        throw error
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      map(() => {
        this.toastService.showSuccess('User deleted successfully.');
      }),
      catchError((error) => {
        this.toastService.showFailure('Failed to delete user.');
        throw error
      })
    );
  }
}
