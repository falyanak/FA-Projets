import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersGateway } from 'src/app/core/gateways/users.gateway';
import { User } from 'src/app/core/models/user.model';
import {
  Observable,
  combineLatest,
  debounceTime,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  search = this.fb.nonNullable.group({
    id: [''],
    name: [''],
    username: [''],
    email: [''],
  });

  //users$: Observable<User[]> = this.usersGateway.fetchUsers();
  users$: Observable<User[]> = this.getUsers();

  constructor(private usersGateway: UsersGateway, private fb: FormBuilder) {}

  private getUsers(): Observable<User[]> {
    const search$ = combineLatest([
      this.search.controls.id.valueChanges.pipe(startWith('')),
      this.search.controls.name.valueChanges.pipe(startWith('')),
      this.search.controls.username.valueChanges.pipe(startWith('')),
      this.search.controls.email.valueChanges.pipe(startWith('')),
    ]).pipe(debounceTime(300));

    return search$.pipe(
      switchMap(([id, name, username, email]) =>
        this.usersGateway.fetchUsers({
          id,
          name,
          username,
          email,
        })
      )
    );
  }
}
