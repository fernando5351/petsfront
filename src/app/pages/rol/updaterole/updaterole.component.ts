import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolService } from '../../../service/rol/rol.service';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { FormsModule } from '@angular/forms';
import { Role, UpdateRol, item } from '../../../interfaces/role.interface';
import { PermissionService } from '../../../service/permission/permission.service';
import { UpdatePermission } from '../../../interfaces/role.permissions.interface';
import { permissionItems } from '../../../utils/itemsAcess.object';
import { NgIf } from '@angular/common';
import { roleObject } from '../../../utils/role.object';
import { AlertService } from '../../../service/alertservice/alertervice.service';

@Component({
  selector: 'app-updaterole',
  standalone: true,
  imports: [CdkAccordionModule, FormsModule, NgIf],
  templateUrl: './updaterole.component.html',
  styleUrl: './updaterole.component.scss'
})

export class UpdateroleComponent implements OnInit {
  roleId: string = '';
  role: Role = roleObject;

  formData = {
    name: '',
  };

  items: item[] = permissionItems;
  expandedIndex = 0;
  status: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rolService: RolService,
    private permissionService: PermissionService,
    private alertService: AlertService
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
          this.alertService.errorAlert('Error', error.message);
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
          this.items[index].permissions.getById = permission.getById;
          this.items[index].permissions.onlyMyRecord = permission.onlyMyRecord;
        }
      });
    }
  }

  toggle(permission: keyof typeof item.permissions, item: any) {
    item.permissions[permission] = !item.permissions[permission];
  }

  changeStatus() {
    let  message = 'Esta accion revoca o devuelve permiso para acceder';

    this.alertService.sucessAlert("Estado cambiado", message, { position: 'top-end' }, true);
    this.status = !this.status;
  }

  goTo() {
    this.router.navigate(['rol']);
  }

  onSubmit() {
    if (this.formData.name === '') {
      this.alertService.errorAlert('Error', 'Nombre requerido');
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
          this.alertService.errorAlert('Error', error.error.message);
        }
      }
    })
  }


}
