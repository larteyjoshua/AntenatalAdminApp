import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USERNAME = 'username';
const USER_ROLe = 'user-role';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUserName(email: string): void {
    window.sessionStorage.removeItem(USERNAME);
    window.sessionStorage.setItem(USERNAME, email);
  }
  public getUserEmail(): string | null {
    return window.sessionStorage.getItem(USERNAME);
  }
  public saveUserRole(role: string): void {
    window.sessionStorage.removeItem(USER_ROLe);
    window.sessionStorage.setItem(USER_ROLe, role);
  }
  public getUserRole(): string | null {
    return window.sessionStorage.getItem(USER_ROLe);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
