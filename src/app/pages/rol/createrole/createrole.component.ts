import { Component } from '@angular/core';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { FormsModule } from '@angular/forms';
import { RolService } from '../../../service/rol/rol.service';
import { CreateRol, Role } from '../../../interfaces/role.interface';

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
    { name: 'Dueños', accessName: 'owner', permissions: { canCreate: true, canRead: true, canUpdate: true, canDelete: true } },
    { name: 'Especies', accessName: 'specie', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
  ];
  expandedIndex = 0;
  status: boolean = true;

  constructor(
    private rolService: RolService
  ) {}

  toggle(permission: keyof typeof item.permissions, item: any) {
    item.permissions[permission] = !item.permissions[permission];
    console.log(item);
  }

  delete(){
    alert('me vas a eliminar? :(')
  }

  changeStatus() {
    this.status = !this.status;
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
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
