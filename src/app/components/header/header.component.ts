import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	constructor(private modalService: NgbModal) {}

  open() {
		const modalRef = this.modalService.open(UserFormComponent);
	}
}
