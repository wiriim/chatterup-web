import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/userService';
import { catchError, Subscription, switchMap } from 'rxjs';
import { StompService } from '../../services/stompService';
import { Chat } from '../../models/Chat';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChatBox } from '../../components/chat-box/chat-box';
import { ChatResponse } from '../../models/ChatResponse';
import { ChatDetail } from '../../components/chat-detail/chat-detail';

@Component({
  selector: 'app-chats',
  imports: [RouterLink, ChatBox, ChatDetail],
  templateUrl: './chats.html',
})
export class Chats implements OnInit, OnDestroy {
  userService = inject(UserService);
  stompService = inject(StompService);
  activatedRoute = inject(ActivatedRoute);
  userChats = signal<Chat[] | null>(null);
  chatId = signal<string>('');
  viewMore = signal<boolean>(false);
  viewedChat = signal<Chat | null>(null);

  chatSubscription?: Subscription;
  newChat = signal<ChatResponse | null>(null);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.chatId.set(params['id']);
    });
  }

  ngOnInit(): void {
    //get or create current user
    //then get current user's chats
    this.userService
      .getOrCreateCurrentUser()
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        }),

        switchMap((user) => {
          this.userService.currentUser.set(user);

          this.stompService.connect();
          this.chatSubscription = this.stompService.chats$.subscribe((chat) => {
            this.newChat.set(chat);
          });

          return this.userService.getUserChats().pipe(
            catchError((err) => {
              console.error(err);
              throw err;
            }),
          );
        }),
      )
      .subscribe((chats) => {
        this.userChats.set(chats);
      });
  }

  ngOnDestroy(): void {
    this.chatSubscription?.unsubscribe();
  }

  disconnect() {
    this.stompService.disconnect();
  }

  toggleViewMore(chat: Chat | null) {
    this.viewMore.set(!this.viewMore());
    this.viewedChat.set(chat);
  }
}
