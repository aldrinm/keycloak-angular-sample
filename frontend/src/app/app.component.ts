import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthButtonsComponent } from './components/auth-buttons/auth-buttons.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthButtonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'yet-another-web';
  protectedResource: ProtectedResource = {
    id: '',
    content: ''
  };
  
  constructor(private http: HttpClient) {
  }
  
  invokeProtectedResource() {
    this.http.get<ProtectedResource>('http://localhost:8080/resource').subscribe(data => {
      console.log("data = ", data);
      this.protectedResource = data;
      console.log("this.protectedResource = ", this.protectedResource);
    });
  }

}

export interface ProtectedResource {
  id: string;
  content: string;
};