import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  standalone: true,
  template: `
    <button
      (click)="loginWithRedirect()"
      class="border rounded-xl px-5 py-1 cursor-pointer mt-5 hover:bg-white hover:text-black hover:border-white transition-bg duration-100"
    >
      Enter
    </button>
  `,
})
export class LoginButton {
  private auth = inject(AuthService);

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }
}
