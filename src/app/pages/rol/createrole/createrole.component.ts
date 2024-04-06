import { Component, EventEmitter } from '@angular/core';
import {CdkAccordionModule} from '@angular/cdk/accordion';

@Component({
  selector: 'app-createrole',
  standalone: true,
  imports: [ CdkAccordionModule ],
  templateUrl: './createrole.component.html',
  styleUrl: './createrole.component.scss'
})
export class CreateroleComponent {
  items = [
    { accessName: 'Roles', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { accessName: 'Usuarios', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { accessName: 'Permisos', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { accessName: 'Animales', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
    { accessName: 'Permisos', permissions: { canCreate: false, canRead: false, canUpdate: false, canDelete: false } },
  ];
  expandedIndex = 0;

  toggle(permission: keyof typeof item.permissions, item: any) {
    item.permissions[permission] = !item.permissions[permission];
    console.log(item);
  }

  delete(){
    alert('me vas a eliminar? :(')
  }
}
