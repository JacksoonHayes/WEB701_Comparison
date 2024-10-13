import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;
  newPassword: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  onSubmit() {
    if (this.newPassword) {
      // Perform password update logic here
      console.log('New password:', this.newPassword);
    }
  }

  redeemToken() {
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
  }
  
}
