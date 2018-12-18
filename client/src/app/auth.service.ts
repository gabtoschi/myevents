import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserInfo {
  _id: string,
  email: string,
  name: string,
  exp: string,
  iat: string
}

export interface TokenResponse {
  token: string
}

export interface TokenPayload {
  email: string,
  password: string,
  name: string
}

const tokenLabel = 'myevents-jwt';
const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem(tokenLabel, token);
    this.token = token;
  }

  public getToken() : string {
    if (!this.token) return localStorage.getItem(tokenLabel);
    return this.token;
  }

  public logout(): void {
    this.token = '';
    localStorage.removeItem(tokenLabel);
    this.router.navigateByUrl('/');
  }

  public getUserInfo(): UserInfo {
    const token = this.getToken();
    let payload;

    if (!token) return null;
    
    payload = token.split('.')[1];
    payload = window.atob(payload);
    return JSON.parse(payload);
  }

  public isLogged(): boolean {
    const user = this.getUserInfo();
    
    if (!user) return false;
    return parseInt(user.exp) > Date.now() / 1000;
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;
  
    if (method === 'post') {
      base = this.http.post(`${apiUrl}/api/${type}`, user);
      console.log('post request client ok');
    } else {
      base = this.http.get(`${apiUrl}/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
  
    const request = base.pipe(
      map((data: TokenResponse) => {
        console.log('request pipe map ok');
        if (data.token) {
          console.log('save token ok');
          this.saveToken(data.token);
        }
        return data;
      })
    );
  
    return request;
  }

  public register(user: TokenPayload) : Observable<any> {
    console.log('auth service register ok');
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload) : Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile() : Observable<any> {
    return this.request('get', 'profile');
  }
}
