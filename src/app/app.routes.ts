import { Routes } from '@angular/router';
import { Users } from './users/users';
import { Chats } from './chats/chats';

export const routes: Routes = [
  {
    path: '',
    component: Users,
    title: 'Home Page',
  },
  {
    path: 'users',
    component: Users,
    title: 'Users Page',
  },
  {
    path: 'chats',
    component: Chats,
    title: 'Chats Page',
  }
];
