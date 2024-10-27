import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any; // Initialize user to an empty object
  newPassword: string = ""; // Initialize newPassword to an empty string
  isLoggedIn: boolean = false; // Initialize isLoggedIn to false

  // Inject the AuthService and Router into the constructor
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  // Function to handle the update details form submission
  updateDetails() {
    if (this.newPassword) { // Check if the new password is not empty
      this.authService.updatePassword(this.newPassword).subscribe( // Call the updatePassword function from the AuthService
        (res: any) => {
          console.log(res.message);
          // Optionally display a success message to the user
          alert('Password updated successfully!');
        },
        (err) => {
          console.error('Error updating password:', err);
          // Optionally display an error message to the user
          alert('Failed to update password.');
        }
      );
    } else {
      alert('Please enter a new password.');
    }
  }
  
  // Function to handle the redeem token button click
  redeemToken() {
    this.authService.redeemToken().subscribe( // Call the redeemToken function from the AuthService
      (res: any) => {
        this.user.vouchers = res.vouchers;  // Update the vouchers count
        alert('Token redeemed successfully!');
      },
      // Handle errors
      (err) => {
        if (err.status === 401) {
          // Handle unauthorized error, maybe redirect to login or show a message
          alert('Session expired or unauthorized. Please log in again.');
          this.router.navigate(['/login']); // Redirect to the login page
        } else {
          alert('Failed to redeem token: ' + err.error.message);
        }
      }
    );
  }
  
  // Function to handle the logout button click
  ngOnInit() {
    const profileObservable = this.authService.getProfile(); // Call the getProfile function from the AuthService
  
    if (profileObservable) {
      profileObservable.subscribe(
        (profile: any) => {
          this.user = profile.user; // Set the user object
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/login']); // Redirect to the login page
        }
      );
    } else {
      this.router.navigate(['/login']); 
    }

    // Check if the user is logged in
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  
}
