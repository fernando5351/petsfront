import { Component } from '@angular/core';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { FormsModule } from '@angular/forms';
import { RolService } from '../../../service/rol/rol.service';
import { CreateRol, Role } from '../../../interfaces/role.interface';
import { PermissionService } from '../../../service/permission/permission.service';
import { CreatePemission } from '../../../interfaces/role.permissions.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createrole',
  standalone: true,
  imports: [ CdkAccordionModule, FormsModule ],
  templateUrl: './createrole.component.html',
  styleUrl: './createrole.component.scss'
})
export class CreateroleComponent {
  formData = {
    name: ''
  };
  items = [
    { name: 'Roles', accessName: 'role', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { name: 'Usuarios', accessName: 'user', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { name: 'Permisos', accessName: 'permissions', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { name: 'Animales', accessName: 'pet', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { name: 'Direcciones', accessName: 'direction', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { name: 'Dueños', accessName: 'owner', permissions: { canCreate: true, canRead: true, canUpdate: true, canDelete: true } },
    { name: 'Especies', accessName: 'specie', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
  ];
  expandedIndex = 0;
  status: boolean = true;

  constructor(
    private rolService: RolService,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  toggle(permission: keyof typeof item.permissions, item: any) {
    item.permissions[permission] = !item.permissions[permission];
  }

  changeStatus() {
    this.status = !this.status;
  }

  goTo() {
    this.router.navigate(['rol']);
  }

  onSubmit() {
    if (this.formData.name === '') {
      alert('name mustbe a string');
      return
    }
    const role: CreateRol = {
      name: this.formData.name,
      status: this.status
    }
    this.rolService.createRol(role).subscribe({
      next: (response) => {
        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[i];

          const dto: CreatePemission = {
            accessName: item.accessName,
            canCreate: item.permissions.canCreate,
            canUpdate: item.permissions.canUpdate,
            canDelete: item.permissions.canDelete,
            canRead: item.permissions.canRead,
            roleId: response.data.id
          }
          this.permissionService.createPermission(dto).subscribe({
            next: (response) => {
              this.router.navigate(['rol']);
            }
          });
        }
      },
      error: (error) => {
        if (error.status !== 401) {
          Swal.fire({
            title: 'error',
            text: error.error.message,
            icon: 'error'
          })
        }
      }
    })
  }
}
