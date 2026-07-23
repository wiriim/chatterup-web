import { inject, Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { Subject, Subscription } from 'rxjs';
import { UserService } from './userService';
import { CreateMessageRequest } from '../models/CreateMessageRequest';
import { Chat } from '../models/Chat';
import { ChatResponse } from '../models/ChatResponse';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  rxStomp = new RxStomp();
  subscription = new Subscription();
  userService = inject(UserService);
  private chatsSubject = new Subject<ChatResponse>();
  chats$ = this.chatsSubject.asObservable();

  connect() {
    if (this.rxStomp.active) {
      return;
    }
    
    this.rxStomp.configure({
      brokerURL: 'ws://localhost:8080/ws',
    });

    this.rxStomp.activate();

    this.subscription = this.rxStomp
      .watch({ destination: `/chat/${this.userService.currentUser()?.id}` })
      .subscribe((chat) => this.chatsSubject.next(JSON.parse(chat.body)));
  }

  send(message: CreateMessageRequest) {
    this.rxStomp.publish({
      destination: `/app/chat/${this.userService.currentUser()?.id}`,
      body: JSON.stringify(message),
    });
  }

  async disconnect() {
    this.subscription.unsubscribe();
    await this.rxStomp.deactivate();
  }
}
