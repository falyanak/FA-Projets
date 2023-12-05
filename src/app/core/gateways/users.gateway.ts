import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserSearch } from '../models/user-search.model';

@Injectable({
  providedIn: 'root',
})
export class UsersGateway {
  constructor(private http: HttpClient) {}

  fetchUsers(search: UserSearch): Observable<User[]> {
    let params = new HttpParams();

    if (search.name) params = params.append('name_like', search.name);
    if (search.username)
      params = params.append('username_like', search.username);
    if (search.id) params = params.append('id_like', search.id);
    if (search.email) params = params.append('email_like', search.email);

    return this.http.get<User[]>('http://localhost:3000/users', { params });
  }
}
