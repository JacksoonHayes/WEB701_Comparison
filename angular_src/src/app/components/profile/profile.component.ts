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
  user: any;
  newPassword: string = "";
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  updateDetails() {
    if (this.newPassword) {
      this.authService.updatePassword(this.newPassword).subscribe(
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
  

  redeemToken() {
    this.authService.redeemToken().subscribe(
      (res: any) => {
        this.user.vouchers = res.vouchers;  // Update the vouchers count
        alert('Token redeemed successfully!');
      },
      (err) => {
        console.error(err);
        alert('Failed to redeem token: ' + err.error.message);
      }
    );
  }
  
  ngOnInit() {
    const profileObservable = this.authService.getProfile();
  
    if (profileObservable) {
      profileObservable.subscribe(
        (profile: any) => {
          this.user = profile.user;
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }

    // Check if the user is logged in
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  
}
