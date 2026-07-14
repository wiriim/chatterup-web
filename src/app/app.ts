import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent } from './components/login-button/login-button';
import { LogoutButtonComponent } from './components/logout-button/logout-button';
import { ProfileComponent } from './components/profile/profile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, LoginButtonComponent, LogoutButtonComponent, ProfileComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('chatterup-web');
  protected auth = inject(AuthService);
}
