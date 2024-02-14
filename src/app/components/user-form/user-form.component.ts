import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() userData: any;
  @Input() editMode!: boolean;

  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dataService: DataService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.editMode && this.userData) {
      this.initializeEditUserForm();
    }
  }

  
  private initializeForm(): void {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  private initializeEditUserForm(): void {
    this.userForm.patchValue({
      firstname: this.userData?.firstname,
      lastname: this.userData?.lastname,
      email: this.userData?.email,
      address: this.userData?.address
    });
  }


  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      if (this.editMode) {
        const user: User = {
          ...this.userForm.value,
          id: this.userData.id,
        };
        if (user.id) {
          this.userService.updateUser(user).subscribe((updatedUser) => {
            this.dataService.notifyUserUpdate(updatedUser);
            this.activeModal.close();
            this.editMode = false;
            this.userData = null;
          });
        } else {
          console.error('User id is missing for update operation.');
        }
      } else {
        this.userService.addUser(user).subscribe((newUser) => {
          this.dataService.notifyUserAdd(newUser);
          this.activeModal.close();
        });
      }
      this.userForm.reset();
    }
  }
}
