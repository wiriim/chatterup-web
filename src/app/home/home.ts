import { Component, inject, OnInit, signal } from '@angular/core';
import { Profile } from '../components/profile/profile';
import { LoginButton } from '../components/login-button/login-button';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { Navbar } from '../components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, LoginButton, Navbar, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected auth = inject(AuthService);
}
