import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/userService';
import { catchError } from 'rxjs';
import { StompService } from '../../services/stomp-service';
import { CreateMessageRequest } from '../../models/CreateMessageRequest';

@Component({
  selector: 'app-chats',
  imports: [],
  templateUrl: './chats.html',
  styleUrl: './chats.css',
})
export class Chats implements OnInit {
  userService = inject(UserService);
  stompService = inject(StompService);
  userId = signal<number>(this.userService.currentUser()?.id || 0);
  chatId = signal<number>(1);
  content = signal<string>('');

  ngOnInit(): void {
    this.userService
      .getOrCreateCurrentUser()
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        }),
      )
      .subscribe((user) => {
        this.userService.currentUser.set(user);
        console.log(this.userService.currentUser());

        return this.userService.getUsers();
      });
  }

  connect(){
    this.stompService.connect();
  }

  disconnect(){
    this.stompService.disconnect();
  }

  sendMessage() {
    const message: CreateMessageRequest = {
      userId: this.userId(),
      chatId: this.chatId(),
      content: this.content(),
    };
    
    this.stompService.send(message);
  }

  updateContent(event: KeyboardEvent){
    const text = (event.target as HTMLInputElement).value;
    this.content.set(text);
  }
}
