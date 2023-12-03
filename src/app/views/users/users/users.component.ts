import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersGateway } from 'src/app/core/gateways/users.gateway';
import { User } from 'src/app/core/models/user.model';
import { Observable } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  search = this.fb.nonNullable.group({
    name: [''],
  });

  users$: Observable<User[]> = this.usersGateway.fetchUsers();

  constructor(private usersGateway: UsersGateway, private fb: FormBuilder) {}
}
