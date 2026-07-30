import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateChatRequest } from '../models/CreateChatRequest';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  http = inject(HttpClient);

  createChat(request: CreateChatRequest) {
    const url = `${environment.backend.fullUrl}/chats`;

    return this.http.post<Chat>(url, request, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getChatMessages(chatId: string) {
    const url = `${environment.backend.fullUrl}/chats/${chatId}/messages`;

    return this.http.get<Message[]>(url);
  }

  addUserToChat(chatId: number, userId: number) {
    const url = `${environment.backend.fullUrl}/chats/${chatId}/users/${userId}`;

    return this.http.post<Chat>(url, {});
  }
}
