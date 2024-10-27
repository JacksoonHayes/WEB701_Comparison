import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

// Injectable is a decorator that allows us to inject services into our components
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any; // Auth token is used to authenticate the user
  user: any; // User object to store user data
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); // BehaviorSubject to store the login status of the user

  constructor(private http: HttpClient) { }

  // Observable to check if the user is logged in
  getIsLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }
  
  // Register user function
  registerUser(user: any) {
    let headers = new HttpHeaders(); // Create a new HttpHeaders object
    headers.append('Content-Type', 'application/json'); // Set the content type to application/json
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers }) // Make a POST request to the register endpoint
      .pipe(map((res: any) => res)); 
  }

  // Authenticate user function
  authenticateUser(user: any) {
    let headers = new HttpHeaders(); // Create a new HttpHeaders object
    headers.append('Content-Type', 'application/json'); // Set the content type to application/json
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers }) // Make a POST request to the authenticate endpoint
      .pipe(map((res: any) => res));
  }

  // storeUserData function to store the token and user data in localStorage
  storeUserData(token: any, user: any) {
    localStorage.setItem('token', token); // Set the token in localStorage
    localStorage.setItem('user', JSON.stringify(user)); // Set the user object in localStorage
    this.authToken = token; // Set the authToken to the token
    this.user = user; 
    this.isLoggedInSubject.next(true); // Set the login status to true
  }

  // getProfile function to get the user profile
  getProfile() {
    let token: string | null = null; 
    // Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('token');
    } 
    // If there's a token, proceed with the profile request
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the Authorization header
      return this.http.get('http://localhost:3000/users/profile', { headers }) // Make a GET request to the profile endpoint
        .pipe(map((res: any) => res));
    } else {
      return null;  // Return null if there's no token
    }
  }

  // updateProfile function to update the user profile
  updatePassword(newPassword: string) {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the Authorization header
    return this.http.put('http://localhost:3000/users/update', { newPassword }, { headers }) // Make a PUT request to the update endpoint
      .pipe(map((res: any) => res));
  }

  // redeemToken function to redeem the token
  redeemToken() {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the Authorization header
    return this.http.post('http://localhost:3000/users/redeem-token', {}, { headers }) // Make a POST request to the redeem-token endpoint
      .pipe(map((res: any) => res));
  }
  
  // isLoggedIn function to check if the user is logged in
  isLoggedIn() {
    let token: string | null = null;
    // Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) { 
      token = localStorage.getItem('token'); // Get the token from localStorage
    }
    return token !== null; // Return true if the token is not null
  }

  // logout function to log the user
  logout() {
    this.authToken = null; // Set the authToken to null
    this.user = null; // Set the user object to null
    localStorage.clear(); // Clear the localStorage
    this.isLoggedInSubject.next(false); // Set the login status to false
  }
}
