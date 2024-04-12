import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolService } from '../../../service/rol/rol.service';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Role, UpdateRol } from '../../../interfaces/role.interface';
import { PermissionService } from '../../../service/permission/permission.service';
import { UpdatePermission } from '../../../interfaces/role.permissions.interface';
import { LoadingService } from '../../../service/loading/loading.service';

export interface item {
   id: number;
   name: string;
   accessName: string;
   permissions: {
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDelete: boolean
  }
}

@Component({
  selector: 'app-updaterole',
  standalone: true,
  imports: [CdkAccordionModule, FormsModule],
  templateUrl: './updaterole.component.html',
  styleUrl: './updaterole.component.scss'
})

export class UpdateroleComponent implements OnInit {
  roleId: string = '';
  role: Role = {
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

  formData = {
    name: '',
  };

  items: item[] = [
    { id: 0, name: 'Roles', accessName: 'role', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { id: 0, name: 'Usuarios', accessName: 'user', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { id: 0, name: 'Permisos', accessName: 'permissions', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { id: 0, name: 'Animales', accessName: 'pet', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { id: 0, name: 'Direcciones', accessName: 'direction', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { id: 0, name: 'Dueños', accessName: 'owner', permissions: { canCreate: true, canRead: true, canUpdate: true, canDelete: true } },
    { id: 0, name: 'Especies', accessName: 'specie', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
  ];
  expandedIndex = 0;
  status: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rolService: RolService,
    private permissionService: PermissionService,
    private loadingService: LoadingService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roleId = params['id'];

      this.rolService.getRolById(Number(this.roleId)).subscribe({
        next: (response) => {
          this.role = response.data;
          this.formData.name = this.role.name;
          this.status = this.role.status;
          this.updateItemsWithRolePermissions();
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error'
          })
        }
      });
    });
  }

  updateItemsWithRolePermissions(): void {
    if (this.role && this.role.Permissions) {
      this.role.Permissions.forEach(permission => {
        const index = this.items.findIndex(item => item.accessName === permission.accessName);
        if (index !== -1) {
          this.items[index].id = permission.id;
          this.items[index].permissions.canCreate = permission.canCreate;
          this.items[index].permissions.canRead = permission.canRead;
          this.items[index].permissions.canUpdate = permission.canUpdate;
          this.items[index].permissions.canDelete = permission.canDelete;
        }
      });
    }
  }

  toggle(permission: keyof typeof item.permissions, item: any) {
    item.permissions[permission] = !item.permissions[permission];
  }

  changeStatus() {
    console.log('inicialmente: ' + this.status);

    Swal.fire({
      title: "Estado cambiado",
      text: 'Esta accion revoca o devuelve permiso para acceder',
      icon: 'success',
      toast: true,
      position: 'top-end',
      timer: 2000
    })
    this.status = !this.status;
  }

  goTo() {
    this.router.navigate(['rol']);
  }

  onSubmit() {
    if (this.formData.name === '') {
      Swal.fire({
        title: 'Error',
        text: 'Nombre requerido',
        icon: 'error',
        position: 'top-end'
      });
      return
    }
    const role: UpdateRol = {
      name: this.formData.name,
      status: this.status
    }

    this.rolService.updateRol( Number(this.roleId) ,role).subscribe({
      next: (response) => {
        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[i];

          const dto: UpdatePermission = {
            accessName: item.accessName,
            canCreate: item.permissions.canCreate,
            canUpdate: item.permissions.canUpdate,
            canDelete: item.permissions.canDelete,
            canRead: item.permissions.canRead,
            roleId: response.data.id
          }
          this.permissionService.updatePermission( item.id, dto).subscribe({
            next: (response) => {
            }
          });
        }
        this.router.navigate(['rol']);
      },
      error: (error) => {
        if (error.status !== 401) {
          Swal.fire({
            title: 'Error',
            text: error.error.message,
            icon: 'error',
          })
        }
      }
    })
  }


}
