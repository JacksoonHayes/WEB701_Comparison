import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [RouterLink, FormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

      // Login and authenticate the user
  this.authService.authenticateUser(user).subscribe(data => {
    if (data.success) {
      // Store the user data in local storage
      this.authService.storeUserData(data.token, data.user);
      // Show a success message
      alert('You are now logged in.');
      // Redirect to the dashboard
      this.router.navigate(['/dashboard']);
    } else {
      // Show an error message if login fails
      alert('Login failed. Please try again.');
      // Redirect back to the login page
      this.router.navigate(['/login']);
    }
  });
  };
}
