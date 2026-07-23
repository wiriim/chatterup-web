import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateChatRequest } from '../models/CreateChatRequest';
import { Chat } from '../models/Chat';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  http = inject(HttpClient);

  createChat(request: CreateChatRequest) {
    const url = 'http://localhost:8080/chats';
    
    return this.http.post<Chat>(url, request, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getChatMessages(chatId: string){
    const url =  `http://localhost:8080/chats/${chatId}/messages`;

    return this.http.get<Message[]>(url);
  }
}
