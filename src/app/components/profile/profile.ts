import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (auth.isLoading$ | async) {
      <div class="loading-text">Loading profile...</div>
    }
    
    @if ((auth.isAuthenticated$ | async) && (auth.user$ | async); as user) {
      <div class="flex items-center gap-2 mt-10">
        @if (user.picture) {
          <img 
            [src]="user.picture" 
            [alt]="user.name || 'User'"
            class="profile-picture w-6 h-6 rounded-full"
          />
        }
        <div style="text-align: center;">
          <div 
            class="profile-name text-base"
          >
            {{ user.nickname }}
          </div>
        </div>
      </div>
    }
  `
})
export class Profile {
  protected auth = inject(AuthService);
}