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
    this.authService.registerUser(user).subscribe(
      (res: any) => {
        // Registration successful
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      (err: any) => {
        // Check if the error is due to a duplicate email
        if (err.status === 400 && err.error.msg === 'Email is already registered') {
          alert('This email is already registered. Please use another one.');
        } else {
          alert('Registration failed. Please try again.');
        }
    });
  }
}


