import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  template: `
    <button
      (click)="logout()"
      class="button logout cursor-pointer border border-[#f5f5f51a] rounded px-5 py-2.5 text-nowrap gap-2 hover:bg-[#ffffff14] hover:border-[#ffffff2e] flex items-center"
    >
      <span>Log Out</span>
      <div>
        <svg
          width="1rem"
          height="1rem"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M10 12H20M20 12L17 9M20 12L17 15"
              stroke="#ffffff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17"
              stroke="#ffffff"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>
          </g>
        </svg>
      </div>
    </button>
  `,
})
export class LogoutButton {
  private auth = inject(AuthService);

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }
}
