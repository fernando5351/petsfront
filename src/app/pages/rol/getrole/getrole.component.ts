import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleComponent } from '../../../components/role/role.component';
import { Role } from '../../../interfaces/role.interface';
import { RolService } from '../../../service/rol/rol.service';

@Component({
  selector: 'app-getrole',
  standalone: true,
  imports: [RoleComponent],
  templateUrl: './getrole.component.html',
  styleUrl: './getrole.component.scss'
})
export class GetroleComponent implements OnInit {
  roles: Role[] = [{
    id: 0,
    name: 'Admin',
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
  }];

  constructor(
    private router: Router,
    private rolService: RolService
  ){}

  ngOnInit(): void {

  }

  create() {
    this.router.navigate(['rol/create'])
  }

  loadRoles(){
    this.rolService.getRol().subscribe({
      next: (response) => {
        console.log(response);

        this.roles = response.data;
      },
      error: (error) => {
        alert(error);
      }
    })
  }
}
