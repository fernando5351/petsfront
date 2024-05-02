import { Component } from '@angular/core';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { FormsModule } from '@angular/forms';
import { RolService } from '../../../service/rol/rol.service';
import { CreateRol, Role } from '../../../interfaces/role.interface';
import { PermissionService } from '../../../service/permission/permission.service';
import { CreatePemission } from '../../../interfaces/role.permissions.interface';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { permissionItems } from '../../../utils/itemsAcess.object';
import { AlertService } from '../../../service/alertservice/alertervice.service';

@Component({
  selector: 'app-createrole',
  standalone: true,
  imports: [ CdkAccordionModule, FormsModule, NgIf ],
  templateUrl: './createrole.component.html',
  styleUrl: './createrole.component.scss'
})
export class CreateroleComponent {
  formData = {
    name: ''
  };
  items = permissionItems;
  expandedIndex = 0;
  status: boolean = true;

  constructor(
    private rolService: RolService,
    private permissionService: PermissionService,
    private router: Router,
    private alertService: AlertService
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
            onlyMyRecord: item.permissions?.onlyMyRecord ?? false,
            getById: item.permissions.getById,
            roleId: response.data.id
          }
          console.log(dto);

          this.permissionService.createPermission(dto).subscribe({
            next: (response) => {
              this.router.navigate(['rol']);
            }
          });
        }
      },
      error: (error) => {
        if (error.status !== 401) {
          this.alertService.errorAlert('Error', error.error.message);
        }
      }
    })
  }
}
