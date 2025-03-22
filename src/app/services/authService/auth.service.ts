import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private url = "http://localhost:8080/api/v1/auth"

    getCode(code: string, state: string): Observable<any> {
      return this.http.get<any>(`${this.url}/callback?code=${code}&state=${state}`)
    }

    login(): Observable<string> {
      return this.http.get(`${this.url}/login`, { responseType: 'text' });
    }
  }
