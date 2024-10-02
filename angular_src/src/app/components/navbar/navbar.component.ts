import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogoutClick() {
    // Logout the user
    this.authService.logout();
    // Show a success message
    alert('You are now logged out.');
    // Redirect to the login page
    this.router.navigate(['/login']);
    return false;
  }
}
