import { Component, inject, input, output, signal } from '@angular/core';
import { User } from '../../models/User';
import { ChatService } from '../../services/chatService';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-chat',
  imports: [FormsModule],
  template: `
    <div
      class="w-screen h-screen bg-[#222]/50 absolute top-0 left-0 flex justify-center items-center"
    >
      <form class="border bg-[#333] rounded-2xl p-5 flex flex-col">
        <h1>Create Chat with {{ addUser()?.username }} ?</h1>

        <p class="flex gap-2 items-center">
          <label for="name">Chat Name: </label>
          <input
            type="text"
            [(ngModel)]="name"
            name="name"
            class="p-1 rounded border my-2"
            required
            minlength="5"
          />
        </p>

        <p class="mt-2">
          <button
            class="mt-auto cursor-pointer w-fit border rounded p-1"
            (click)="cancel(); $event.preventDefault()"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="mt-auto cursor-pointer w-fit border rounded p-1 ms-2"
            (click)="createChat(); $event.preventDefault()"
          >
            Create
          </button>
        </p>
      </form>
    </div>
  `,
  styles: ``,
})
export class CreateChat {
  router = inject(Router);
  chatService = inject(ChatService);
  currentUser = input<User | null>(null);
  addUser = input<User | null>(null);
  onCancel = output<User | null>();
  name = 'New Chat';

  cancel() {
    this.onCancel.emit(null);
  }

  createChat() {
    const request = {
      name: this.name,
      users: [this.currentUser()!.id, this.addUser()!.id],
    };

    this.chatService
      .createChat(request)
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        }),
      )
      .subscribe((chat) => this.router.navigate(['/chats', chat.id]));
  }
}
