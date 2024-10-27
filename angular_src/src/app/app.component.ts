import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterModule, NavbarComponent], // Add RouterLink, RouterOutlet, RouterModule, NavbarComponent to imports
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ValidateService, AuthService]
})
export class AppComponent {
  title = '-WEB701 Angular-';
}
