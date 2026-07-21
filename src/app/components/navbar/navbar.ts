import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LogoutButton } from '../logout-button/logout-button';
import { Profile } from '../profile/profile';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LogoutButton, Profile],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {}
