import { Component } from '@angular/core';
import { CreateUserDto } from '../../../interfaces/user.interface';
import {Role} from '../../../interfaces/role.interface'
import {UserService} from '../../../service/user/user.service'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RolService } from '../../../service/rol/rol.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { roleObject } from '../../../utils/role.object';
import { AlertService } from '../../../service/alertservice/alertervice.service';

@Component({
  selector: 'app-createuser',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.scss'
})
export class CreateuserComponent {

  newUser: CreateUserDto = {
    roleId: 0,
    name: '',
    email: '',
    lastname: '',
    status: true,
  }

  roles: Role[] = [roleObject];


  ngOnInit():void{
    this.getRoles()
  }

  constructor(
    private rolService: RolService,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
  ) {}

    showPassword: boolean = false;

    togglePasswordVisibility(): void {
      this.showPassword = !this.showPassword;
    }


    getRoles(){
      this.rolService.getRol().subscribe({
        next: (response) => {
          console.log(response);
          this.roles = response.data;
        },
        error: (error) => {
        console.log('Error al cargar los datos'), error;
        }
      })
    }

    cancel(){
      this.router.navigate(['/user/list']);
    }

    createUser(): void {

      console.log(this.newUser.status);

      this.userService.createUser(this.newUser).subscribe({
        next: (response) => {
          console.log('User created successfully', response);
          if (response.statusCode === 201) {
            this.alertService.sucessAlert('Usuario creado', `La contraseña es: ${response.data.otpSecret}`, 10000).then(()=> {
              this.router.navigate(['user/list']);
            });
          } else {
            this.router.navigate(['/user/list']);
          }
        },
        error: (error) => {
          console.log('Error', error);
          if (error.status === 400) {
            if (error.error && error.error.message && error.error.message.includes('password')) {
              Swal.fire({
                icon: 'error',
                title: 'Contraseña inválida',
                text: 'La contraseña debe contener al menos una mayúscula, un caracter especial y un número.',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al crear el usuario. Inténtelo de nuevo más tarde.',
              });
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al crear el usuario. Inténtelo de nuevo más tarde.',
            });
          }
        }
      });
    }
}
