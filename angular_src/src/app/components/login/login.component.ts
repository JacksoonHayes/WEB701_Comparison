import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [RouterLink],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    // Initialize the login form with form controls
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter to easily access form controls in the template
  get f() { return this.loginForm.controls; }

  // Method called when form is submitted
  onSubmit() {
    this.submitted = true;

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Dummy login (you can replace this with your backend logic)
    const { email, password } = this.loginForm.value;

    if (email === 'test@example.com' && password === 'password') {
      // Redirect on successful login
      this.router.navigate(['/dashboard']);
    } else {
      // Show error if credentials are incorrect
      this.errorMessage = 'Invalid email or password';
    }
  }
}
