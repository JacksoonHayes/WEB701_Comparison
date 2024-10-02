import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ FormsModule, RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    // Validate the form data
    if (!this.validateService.validateRegister(user)) {
      // Registration successful message
      alert('Please fill in all fields correctly.');
    } else if (!this.validateService.validateEmail(user.email)) {
      // Show an error message if email is invalid
      alert('Please enter a valid email address.');
    }
    // Register the user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        // Registration successful message
        alert('You are now registered and can log in.');
        // Redirect to login page
        this.router.navigate(['/login']);
      } else {
        // Show an error message if registration fails
        alert('Something went wrong. Please try again.');
        this.router.navigate(['/register']);
      }
    });
  }
}


