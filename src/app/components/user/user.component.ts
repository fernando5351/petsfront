import { Component,Input } from '@angular/core';
import {User} from '../../interfaces/user.interface'
import { UserService } from '../../service/user/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @Input() user: User = {
      id: 0,
      password: '',
      email: '',
      name: '',
      lastname: '',
      roleId: 0,
      status: true,
      createdAt: new Date,
      updatedAt: new Date,
      Role: {
        id: 0,
        name: '',
        status: true,
        createdAt: new Date,
        updatedAt: new Date,
        Permissions:[{
          id: 0,
          roleId: 0,
          accessName: '',
          canCreate: false,
          canRead: false,
          canUpdate: false,
          canDelete: false,
          createdAt: new Date,
          updatedAt: new Date
        }]
      },
    }

    constructor(
      private userService: UserService,
      private router: Router
    ){}



    delete() {
      Swal.fire({
        title: '¿Estás seguro de eliminar este registro?',
        text: 'No podrás revertir esta acción',
        icon: 'question',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#353755',
      }).then((result)=> {
        if (result.isConfirmed) {
          this.userService.deleteUser(this.user.id).subscribe({
            next: (response) => {
              // Ejecutar la función para recargar la página
              window.location.reload();
            },
            error: (error) => {
              if (error.status !== 401) {
                Swal.fire({
                  title: 'Error',
                  text: error.message,
                  icon: 'error'
                })
              }
            }
          })
        } else {
          Swal.fire({
            title: 'Cancelado',
            text: 'Tu registro está a salvo',
            icon: 'info'
          })
        }
      })
    }
  }
