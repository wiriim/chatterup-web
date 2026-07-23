import { Component, inject, input, OnChanges, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateMessageRequest } from '../../models/CreateMessageRequest';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/userService';
import { StompService } from '../../services/stompService';
import { ChatService } from '../../services/chatService';
import { Message } from '../../models/Message';
import { catchError, Subscription } from 'rxjs';
import { ChatResponse } from '../../models/ChatResponse';

@Component({
  selector: 'app-chat-box',
  imports: [FormsModule],
  templateUrl: './chat-box.html',
  styles: ``,
})
export class ChatBox implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  stompService = inject(StompService);
  chatService = inject(ChatService);

  content = '';
  chatId = signal<string>('');
  messages = signal<Message[] | null>(null);

  chatSubscription?: Subscription;
  newChat = signal<ChatResponse[]>([]);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.chatId.set(params['id']);

      if (this.chatId()) {
        this.chatService
          .getChatMessages(this.chatId())
          .pipe(
            catchError((err) => {
              console.error(err);
              throw err;
            }),
          )
          .subscribe((messages) => {
            this.messages.set(messages);
            setTimeout(() => {
              this.scrollToBottom();
            }, 0);
          });
      }
    });
  }

  ngOnInit(): void {
    this.chatSubscription = this.stompService.chats$.subscribe((chat) => {
      console.log(chat);
      this.newChat.update(prev => [...prev, chat]);
      console.log(this.newChat());
    });
  }

  ngOnDestroy(): void {
    this.chatSubscription?.unsubscribe();
  }

  sendMessage() {
    const request: CreateMessageRequest = {
      content: this.content,
      chatId: this.chatId().toString(),
      userId: this.userService.currentUser()!.id,
    };
    this.stompService.send(request);
    this.content = '';
  }

  scrollToBottom() {
    const container = document.querySelector('.messages');
    container!.scrollTop = container!.scrollHeight;
  }
}
