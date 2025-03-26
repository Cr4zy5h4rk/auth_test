import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center">
        <h2 *ngIf="isLoading" class="text-xl font-semibold text-gray-700">
          Authentification en cours...
        </h2>
        <div *ngIf="error" class="text-red-500">
          {{ error }}
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CallbackComponent implements OnInit {
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      const errorParam = params['error'];

      if (errorParam) {
        this.handleAuthenticationError(errorParam, params['error_description']);
        return;
      }

      if (code) {
        this.exchangeCodeForToken(code);
      } else {
        this.handleAuthenticationError('no_code', 'No authorization code received');
      }
    });
  }

  private exchangeCodeForToken(code: string): void {
    // Endpoint pour échanger le code contre un token
    const tokenExchangeUrl = `http://localhost:8080/api/delegate/fetchUserInfo?code=${code}`;

    this.http.get(tokenExchangeUrl).pipe(
      map((response: any) => {
        // Stocker le token et les informations utilisateur
        localStorage.setItem('token', response.token);
        localStorage.setItem('userInfo', JSON.stringify(response.user));
        
        // Rediriger vers la page de profil utilisateur
        this.router.navigate(['/user-profile']);
      }),
      catchError((error) => {
        this.handleAuthenticationError('token_exchange_failed', error.message);
        return of(null);
      })
    ).subscribe();
  }

  private handleAuthenticationError(errorCode: string, errorMessage?: string): void {
    this.isLoading = false;
    this.error = `Erreur d'authentification: ${errorMessage || errorCode}`;

    // Rediriger vers la page de connexion avec l'erreur
    setTimeout(() => {
      this.router.navigate(['/login'], { 
        queryParams: { 
          error: errorCode, 
          error_description: errorMessage 
        } 
      });
    }, 3000);
  }
}