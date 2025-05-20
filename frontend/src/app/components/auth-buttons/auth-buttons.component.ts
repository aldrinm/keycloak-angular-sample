import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SecurityStore } from '../../security/security-store';
import { ProtectedResource } from '../../app.component';

@Component({
  selector: 'app-auth-buttons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="auth-nav">
      <button *ngIf="!signedIn()" (click)="login()">Login</button>
      <button *ngIf="signedIn()" (click)="logout()">Logout</button>
    </nav>

  `,
  styles: [`
    .auth-nav {
      padding: 1rem;
    }

  `]
})

export class AuthButtonsComponent {
  isLoggedIn = false;
  protectedResource: ProtectedResource = {
    id: '', 
    content: ''
  };

  constructor (private http: HttpClient, private securityStore: SecurityStore) {
  }
  
  signedIn(): boolean {
    return (this.securityStore.user() != null) && !this.securityStore.user()?.anonymous;
  }

  login() {
    this.securityStore.signIn();
  }

  logout() {
    this.securityStore.signOut();
  }


} 