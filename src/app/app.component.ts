import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthService } from './service/auth/auth.service';
import { LoadingComponent } from './components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LoginComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Role';
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log(this.authService.getToken());
  }

  isLoged():boolean {
    const result = this.authService.isUserLogedIn();
    if (result) {
      return true
    } else {
      return false;
    }
  }
}
