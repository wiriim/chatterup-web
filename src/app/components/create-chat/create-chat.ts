import { Component, inject, input, output, signal } from '@angular/core';
import { User } from '../../models/User';
import { ChatService } from '../../services/chatService';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chat } from '../../models/Chat';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-create-chat',
  imports: [FormsModule],
  template: `
    <div
      class="w-screen h-screen bg-[#222]/50 absolute top-0 left-0 flex justify-center items-center"
    >
      <form
        class="border border-[#f5f5f51a] bg-[#1a1a1a] rounded-2xl p-5 flex flex-col w-100 h-100"
      >
        <div class="flex gap-2">
          <button
            class="cursor-pointer w-fit border border-[#f5f5f51a] rounded px-2.5 py-1 hover:text-purple-300 hover:border-[#ffffff2e]"
            [class]="type() == 'create' ? 'text-purple-300 border-[#ffffff2e]' : ''"
            (click)="this.type.set('create'); this.selectedChat.set(null)"
          >
            Create
          </button>
          <button
            class="cursor-pointer w-fit border border-[#f5f5f51a] rounded px-2.5 py-1 hover:text-blue-300 hover:border-[#ffffff2e]"
            [class]="type() == 'add' ? 'text-blue-300 border-[#ffffff2e]' : ''"
            (click)="this.type.set('add'); getUserChats()"
          >
            Add
          </button>
        </div>

        @if (this.type() == 'create') {
          <div class="gap-2 items-center mt-5">
            <div>
              <label for="name">Name: </label>
            </div>
            <input
              type="text"
              [(ngModel)]="name"
              name="name"
              class="rounded bg-[#141414] border border-[#f5f5f51a] my-2 outline-none p-2"
              required
              minlength="5"
              placeholder="New Chat"
            />
          </div>

          <div class="mt-10 flex gap-2 mt-auto">
            <button
              class="cursor-pointer w-fit border border-[#f5f5f51a] rounded px-2.5 py-1 hover:text-red-300 hover:border-[#ffffff2e]"
              (click)="cancel(); $event.preventDefault()"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="cursor-pointer w-fit border border-[#f5f5f51a] rounded px-2.5 py-1 hover:text-green-300 hover:border-[#ffffff2e]"
              (click)="createChat(); $event.preventDefault()"
            >
              Create
            </button>
          </div>
        } @else {
          <div
            class="border border-[#f5f5f51a] mt-5 rounded p-2.5 bg-[#141414] flex gap-2 items-center"
          >
            <div>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                fill="#ffffff"
                stroke="#ffffff"
                transform="matrix(1, 0, 0, 1, 0, 0)"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <title>search</title>
                  <desc>Created with Sketch Beta.</desc>
                  <defs></defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                    sketch:type="MSPage"
                  >
                    <g
                      id="Icon-Set"
                      sketch:type="MSLayerGroup"
                      transform="translate(-256.000000, -1139.000000)"
                      class="fill-[{{ svgColor() }}]"
                    >
                      <path
                        d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z"
                        id="search"
                        sketch:type="MSShapeGroup"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <input
              (keyup)="search($event)"
              (focus)="this.svgColor.set('#ffffff')"
              (blur)="this.svgColor.set('#555')"
              type="text"
              placeholder="Search Chat"
              class="text-sm outline-none w-full"
            />
          </div>
          <div class="h-full overflow-auto my-2 flex flex-col gap-2 scrollbar-none">
            @if (this.query()) {
              @for (chat of this.filteredChats(); track chat.id) {
                <button
                  class="rounded p-3 cursor-pointer block w-full text-start bg-[#202020fd] hover:bg-[#f5f5f51a]"
                  [class]="this.selectedChat()?.id == chat.id ? 'bg-[#f5f5f52f]' : ''"
                  (click)="selectedChat.set(chat)"
                >
                  {{ chat.name }}
                </button>
              }
            } @else {
              @for (chat of this.userChats(); track chat.id) {
                <button
                  class="rounded p-3 cursor-pointer block w-full text-start bg-[#202020fd] hover:bg-[#f5f5f51a]"
                  [class]="this.selectedChat()?.id == chat.id ? 'bg-[#f5f5f52f]' : ''"
                  (click)="selectedChat.set(chat)"
                >
                  {{ chat.name }}
                </button>
              }
            }
          </div>
          <div class="mt-10 flex gap-2 mt-auto">
            <button
              class="cursor-pointer w-fit border border-[#f5f5f51a] rounded px-2.5 py-1 hover:text-red-300 hover:border-[#ffffff2e]"
              (click)="cancel(); $event.preventDefault()"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="cursor-pointer w-fit border border-[#f5f5f51a] rounded px-2.5 py-1 hover:text-green-300 hover:border-[#ffffff2e]"
              (click)="addUserToChat(); $event.preventDefault()"
            >
              Add
            </button>
          </div>
        }
      </form>
    </div>
  `,
  styles: ``,
})
export class CreateChat {
  router = inject(Router);
  userService = inject(UserService);
  chatService = inject(ChatService);
  currentUser = input<User | null>(null);
  addUser = input<User | null>(null);
  onCancel = output<User | null>();
  type = signal<string>('create');
  svgColor = signal<string>('#555');

  userChats = signal<Chat[]>([]);
  filteredChats = signal<Chat[]>([]);
  selectedChat = signal<Chat | null>(null);
  query = signal<string>('');
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

  getUserChats() {
    this.userService
      .getUserChats()
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        }),
      )
      .subscribe((chats) => this.userChats.set(chats));
  }

  search(event: KeyboardEvent) {
    this.query.set((event.target as HTMLInputElement).value);

    this.filteredChats.set(
      this.userChats().filter((chat) =>
        chat.name.toLowerCase().includes(this.query().toLowerCase()),
      ),
    );
  }

  addUserToChat() {
    if (this.selectedChat()) {
      this.chatService
        .addUserToChat(this.selectedChat()!.id, this.addUser()!.id)
        .pipe(
          catchError((err) => {
            console.error(err);
            throw err;
          }),
        )
        .subscribe((chat) => this.router.navigate(['/chats', chat.id]));
    }
  }
}
