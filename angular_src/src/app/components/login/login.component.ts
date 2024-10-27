import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterLink],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ''; // Initialize email to an empty string
  password: string = ''; // Initialize password to an empty string

  // Inject the AuthService and Router into the constructor
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Function to handle the login form submission
  onLoginSubmit() {
    console.log('Login form submitted');
    const user = { // Create a user object with the email and password
      email: this.email,
      password: this.password
    };

    // Call the authenticateUser function from the AuthService
    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) { // If the response is successful (success is true)
        this.authService.storeUserData(data.token, data.user); // Store the token and user data in localStorage
        alert('You are now logged in.');
        this.router.navigate(['/profile']); // Redirect to the profile page
      } else {
        this.router.navigate(['/login']); // else redirect to the login page to try again
      }
    });
  }
}
