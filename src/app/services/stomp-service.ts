import { inject, Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { Subscription } from 'rxjs';
import { UserService } from './userService';
import { CreateMessageRequest } from '../models/CreateMessageRequest';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  rxStomp = new RxStomp();
  subscription = new Subscription();
  userService = inject(UserService);

  connect() {
    this.rxStomp.configure({
      brokerURL: 'ws://localhost:8080/ws',
    });

    this.rxStomp.activate();

    this.subscription = this.rxStomp
        .watch({ destination: `/chat/${this.userService.currentUser()?.id}` })
        .subscribe((message) => console.log(`Message received: ${message.body}`));
      console.log('Connected to ws://localhost:8080/ws');
      console.log(`watching /chat/${this.userService.currentUser()?.id}`);
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
    console.log('Disconnected');
  }
}
