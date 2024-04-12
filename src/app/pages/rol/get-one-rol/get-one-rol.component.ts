import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolService } from '../../../service/rol/rol.service';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import Swal from 'sweetalert2';
import { Role, UpdateRol } from '../../../interfaces/role.interface';
import { PermissionService } from '../../../service/permission/permission.service';
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
  selector: 'app-get-one-rol',
  standalone: true,
  imports: [CdkAccordionModule],
  templateUrl: './get-one-rol.component.html',
  styleUrl: './get-one-rol.component.scss'
})
export class GetOneRolComponent {
  roleId: string = '';
  isReadOnly: boolean = true;
  isDisabled: boolean = true;
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

  GoTo() {
    this.router.navigate(['rol'])
  }
}
