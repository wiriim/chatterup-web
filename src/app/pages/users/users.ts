import { Component, inject, OnInit, output, signal } from '@angular/core';
import { UserService } from '../../services/userService';
import { User } from '../../models/User';
import { catchError, switchMap } from 'rxjs';
import { CreateChat } from '../../components/create-chat/create-chat';

@Component({
  selector: 'app-users',
  imports: [CreateChat],
  templateUrl: './users.html',
})
export class Users implements OnInit {
  userService = inject(UserService);
  users = signal<User[]>([]);
  filteredUsers = signal<User[]>([]);
  query = signal<string>('');
  createChat = signal<boolean>(false);
  addUser = signal<User | null>(null);

  ngOnInit(): void {
    //get or create current user
    this.userService
      .getOrCreateCurrentUser()
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        }),

        switchMap((user) => {
          this.userService.currentUser.set(user);
          
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
        this.users.set(users);
      });
  }

  search(event: KeyboardEvent) {
    this.query.set((event.target as HTMLInputElement).value);

    this.filteredUsers.set(
      this.users().filter((user) =>
        user.username.toLowerCase().includes(this.query().toLowerCase()),
      ),
    );
  }

  toggleCreateChat(user: User | null){
    this.createChat.set(!this.createChat());
    this.addUser.set(user);
  }
}
