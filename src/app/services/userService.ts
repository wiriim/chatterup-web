import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/User';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs';
import { Chat } from '../models/Chat';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  protected auth = inject(AuthService);
  currentUser = signal<User | null>(null);

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

  getUserChats(){
    const url = `http://localhost:8080/users/${this.currentUser()?.username}/chats`;
    return this.http.get<Chat[]>(url);
  }
}
