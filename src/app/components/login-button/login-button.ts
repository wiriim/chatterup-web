import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  standalone: true,
  template: `
    <button
      (click)="loginWithRedirect()"
      class="border border-[#ffffff14] bg-[#ffffff0a] rounded-xl px-8 py-2 cursor-pointer mt-5 hover:bg-[#ffffff14] hover:border-[#ffffff2e] transition-bg duration-100"
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
