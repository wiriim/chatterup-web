import { Component, input, OnInit, output } from '@angular/core';
import { Chat } from '../../models/Chat';

@Component({
  selector: 'app-chat-detail',
  imports: [],
  template: `
    <div
      class="w-screen h-screen bg-[#222]/50 absolute top-0 left-0 flex justify-center items-center"
    >
      <div class="border border-[#f5f5f51a] bg-[#1a1a1a] rounded-2xl p-5 flex flex-col w-100 h-100">
        <h1 class="text-2xl">{{ this.chat()?.name }}</h1>
        <div
          class="h-full overflow-auto my-2 flex flex-col gap-2 scrollbar-thin scrollbar-thumb-[#f5f5f51a]"
        >
          @for (user of this.chat()?.users; track user.id) {
            <div
              class="rounded p-3 cursor-pointer block w-full text-start bg-[#202020fd] hover:bg-[#f5f5f51a]"
            >
              {{ user.username }}
            </div>
          }
        </div>
        <button
          class="cursor-pointer w-fit mt-auto border border-[#f5f5f51a] rounded px-2.5 py-1 hover:text-red-300 hover:border-[#ffffff2e]"
          (click)="back()"
        >
          Back
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class ChatDetail {
  chat = input<Chat | null>(null);
  onBack = output<Chat | null>();

  back() {
    this.onBack.emit(null);
  }
}
