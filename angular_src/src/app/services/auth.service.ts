import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private http: HttpClient) { }

    getIsLoggedIn() {
      return this.isLoggedInSubject.asObservable();
    }

  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers })
      .pipe(map((res: any) => res));
  }

  authenticateUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers })
      .pipe(map((res: any) => res));
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    this.isLoggedInSubject.next(true);
  }

  getProfile() {
    let token: string | null = null;
  
    // Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('token');
    }
  
    // If there's a token, proceed with the profile request
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get('http://localhost:3000/users/profile', { headers })
        .pipe(map((res: any) => res));
    } else {
      return null; 
    }
  }

  isLoggedIn() {
    let token: string | null = null;
    // Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('token');
    }
    return token !== null;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.isLoggedInSubject.next(false);
  }
}
