import { Component,Input } from '@angular/core';
import {User} from '../../interfaces/user.interface'

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
      },
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
    }
  }

