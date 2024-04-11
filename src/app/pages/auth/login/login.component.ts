import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth/auth.service';
import { loginDto } from '../../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onSubmit() {
    const auth: loginDto = {
      email: '',
      password: ''
    }

    if (this.formData.email !== '' && this.formData.password !== '') {
      auth.email = this.formData.email;
      auth.password = this.formData.password;
    }
    this.authService.login(auth).subscribe({
      next: (response) => {
        this.authService.saveToken(response);
        this.router.navigate(['home'])

      },
      error: (error) => {
        alert(error.message);
      }
    })
  }
}
