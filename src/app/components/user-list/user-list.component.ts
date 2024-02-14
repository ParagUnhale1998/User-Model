import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  users!: User[];

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.dataService.selectedUser$.subscribe((selectedUser) => {
      if (selectedUser) {
        this.fetchUsers();
      }
    });
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  trackById(index: number, user: User): number {
    return user.id;
  }
  
  editUser(user: any) {
    const modalRef = this.modalService.open(UserFormComponent);
    modalRef.componentInstance.userData = user;
    modalRef.componentInstance.editMode = true;
  }

  deleteUser(id: any): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }
}
