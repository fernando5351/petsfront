import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    const user: User | null = await this.authService.getUser();
    if (user !== null) {
      this.name = user.name;
      this.rol = user.Role.name;
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No has iniciado sesión',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        this.router.navigate(['login']);
      })
    }
  }
}
