import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { UserInfo } from '../../models/user-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private readonly url = "http://localhost:8080/api"

    getCode(code: string, state: string): Observable<any> {
      return this.http.get<any>(`${this.url}/callback?code=${code}&state=${state}`)
    }

    saveUser(user: UserInfo): Observable<UserInfo> {
      console.log("user", user)
      return this.http.post<UserInfo>(`${this.url}/donor/save`, user)
    }


}
