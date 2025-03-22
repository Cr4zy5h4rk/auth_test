import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Assurez-vous que OAuthModule est bien importé
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      width: 100%;
      height: 100%;
    }
  `]
})
export class AppComponent {
  title = 'esignet-app';
}
