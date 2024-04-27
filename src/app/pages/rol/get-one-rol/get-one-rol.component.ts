import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolService } from '../../../service/rol/rol.service';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { Role, item } from '../../../interfaces/role.interface';
import { roleObject } from '../../../utils/role.object';
import { permissionItems } from '../../../utils/itemsAcess.object';
import { AlertService } from '../../../service/alertservice/alertervice.service';

@Component({
  selector: 'app-get-one-rol',
  standalone: true,
  imports: [CdkAccordionModule],
  templateUrl: './get-one-rol.component.html',
  styleUrl: './get-one-rol.component.scss'
})

export class GetOneRolComponent implements OnInit {
  roleId: string = '';
  isReadOnly: boolean = true;
  isDisabled: boolean = true;
  role: Role = roleObject

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
        }
      });
    }
  }

  GoTo() {
    this.router.navigate(['rol'])
  }
}
