import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersGateway } from 'src/app/core/gateways/users.gateway';
import { User } from 'src/app/core/models/user.model';
import { Observable, combineLatest, map, startWith, switchMap } from 'rxjs';
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
    username: [''],
    email: [''],
  });

  //users$: Observable<User[]> = this.usersGateway.fetchUsers();
  users$: Observable<User[]> = this.getUsers();

  constructor(private usersGateway: UsersGateway, private fb: FormBuilder) {}

  private getUsers(): Observable<User[]> {
    const users$ = this.usersGateway.fetchUsers();
    // const searchName$ = this.search.controls.name.valueChanges.pipe(startWith(''));

    const search$ = combineLatest([
      this.search.controls.name.valueChanges.pipe(startWith('')),
      this.search.controls.username.valueChanges.pipe(startWith('')),
      this.search.controls.email.valueChanges.pipe(startWith('')),
    ]);

    return combineLatest([users$, search$]).pipe(
      map(([users, [name, username, email]]) =>
        users.filter((user) => {
          const isNameMatching = user.name
            .toLowerCase()
            .includes(name.toLowerCase());
          const isUserNameMatching = user.username
            .toLowerCase()
            .includes(username.toLowerCase());
          const isEmailMatching = user.email
            .toLowerCase()
            .includes(email.toLowerCase());

          return isNameMatching && isUserNameMatching && isEmailMatching;
        })
      )
    );
  }
}
