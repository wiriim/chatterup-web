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
      <form class="border border-[#f5f5f51a] bg-[#1a1a1a] rounded-2xl p-5 flex flex-col">
        <h1 class="text-2xl flex">Chat with&nbsp;<span class="max-w-50 text-nowrap overflow-hidden text-ellipsis">{{ addUser()?.username }}</span> ?</h1>

        <div class="gap-2 items-center mt-5">
          <div>
            <label for="name">Name: </label>
          </div>
          <input
            type="text"
            [(ngModel)]="name"
            name="name"
            class="rounded border border-[#f5f5f51a] my-2 outline-none p-2"
            required
            minlength="5"
            placeholder="New Chat"
          />
        </div>

        <p class="mt-10">
          <button
            class="mt-auto cursor-pointer w-fit border border-[#f5f5f51a] rounded px-2.5 py-1 hover:text-red-300 hover:border-[#ffffff2e]"
            (click)="cancel(); $event.preventDefault()"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="mt-auto cursor-pointer w-fit border border-[#f5f5f51a] rounded px-2.5 py-1 ms-2 hover:text-green-300 hover:border-[#ffffff2e]"
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
