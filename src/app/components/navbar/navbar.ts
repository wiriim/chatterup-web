import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogoutButton } from '../logout-button/logout-button';
import { Profile } from '../profile/profile';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LogoutButton, Profile],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  router = inject(Router);
}
