import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../services/userService';
import { User } from '../models/user';
import { catchError, switchMap } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  userService = inject(UserService);
  users = signal<User[]>([]);
  filteredUsers = signal<User[]>([]);
  query = signal<string>('');

  ngOnInit(): void {
    //get or create current user
    this.userService
      .getOrCreateCurrentUser()
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        }),

        switchMap(() => {
          return this.userService.getUsers();
        }),
      )
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        }),
      )
      .subscribe((users) => {
        console.log(users);
        this.users.set(users);
      });
  }

  search(event: KeyboardEvent) {
    this.query.set((event.target as HTMLInputElement).value);
    
    this.filteredUsers.set(
      this.users().filter((user) => user.username.toLowerCase().includes(this.query().toLowerCase())),
    );
  }
}
