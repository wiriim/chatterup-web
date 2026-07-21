import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  template: `
    <button
      (click)="logout()"
      class="button logout cursor-pointer"
    >
      Log Out
    </button>
  `
})
export class LogoutButton {
  private auth = inject(AuthService);

  logout(): void {
    this.auth.logout({ 
      logoutParams: { 
        returnTo: window.location.origin 
      } 
    });
  }
}