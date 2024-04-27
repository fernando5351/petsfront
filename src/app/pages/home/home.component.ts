import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { userObject } from '../../utils/user.object';
import { UserService } from '../../service/user/user.service';
import { AlertService } from '../../service/alertservice/alertervice.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  name = '';
  rol = '';

  user: User = userObject;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ){}

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    const user: User | null = await this.authService.getUser();
    if (user !== null) {
      this.userService.getUserById(user.id).subscribe({
        next: (response) => {
          this.user = response.data;
          this.name = this.user.name;
          this.rol = this.user.Role.name;
        },
        error: (error) => {
          if (error.status !== 401) {
            this.alertService.errorAlert('Error', error.message, { position: 'top-end' }, true)
          }
        }
      })
    } else {
      this.alertService.errorAlert('Error', 'No has iniciado sesión', { position: 'top-end' }, true).then(() => {
        this.router.navigate(['login'])
      })
    }
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }
}
