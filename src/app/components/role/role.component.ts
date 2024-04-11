import { Component, Input } from '@angular/core';
import { Role } from '../../interfaces/role.interface';
import Swal from 'sweetalert2';
import { RolService } from '../../service/rol/rol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {
  @Input() role: Role = {
    id: 0,
    name: '',
    status: false,
    createdAt: new Date,
    updatedAt: new Date,
    Permissions: [{
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
  };

  constructor(
    private rolService: RolService,
    private router: Router
  ){}

  edit(){
    this.router.navigate([`rol/update/${this.role.id}`]);
  }

  delete(){
    Swal.fire({
      title: '¿Estás seguro de querer borrar este registro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolService.deleteRol(this.role.id).subscribe({
          next: (response) => {
            Swal.fire(
              '¡Eliminado!',
              `El registro ${this.role.name} ha sido eliminado`,
              'success'
            );
            this.router.navigate(['/rol']);
          },
          error: (error) => {
            Swal.fire(
              '¡Error!',
              `Error: ${error.message}`,
              'error'
            );
            this.router.navigate(['/roles']);
          }
        });

      } else {
        Swal.fire({
          title: 'Cancelado',
          text: 'tu registro esta a salvo',
          icon: 'info'
        })
      }
    })
  }
}
