import { Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { Chats } from './pages/chats/chats';

export const routes: Routes = [
  {
    path: '',
    component: Users,
    title: 'Chatter Up: Create new friends, and chat them up.',
  },
  {
    path: 'users',
    component: Users,
    title: 'Chatter Up: Create new friends, and chat them up.',
  },
  {
    path: 'chats',
    component: Chats,
    title: 'Chatter Up: Chat with friends.',
  },
  {
    path: 'chats/:id',
    component: Chats,
    title: 'Chatter Up: Chat with friends.',
  }
];
