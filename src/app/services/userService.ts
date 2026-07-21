import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  protected auth = inject(AuthService);

  getOrCreateCurrentUser() {
    const url = 'http://localhost:8080/users';
    return this.auth.user$.pipe(
      switchMap((user) => {
        return this.http.post<User>(
          url,
          {
            username: user?.nickname,
            picture: user?.picture,
          },
          { headers: { 'Content-Type': 'application/json' } },
        );
      }),
    );
  }

  getUsers() {
    const url = 'http://localhost:8080/users';
    return this.http.get<User[]>(url);
  }
}
