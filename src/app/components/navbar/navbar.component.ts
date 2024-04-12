import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  logOut(){
    this.authService.logOut();
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }
}
