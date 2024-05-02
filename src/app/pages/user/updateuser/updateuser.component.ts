import { Component } from '@angular/core';
import {UpdateUserDto,GetOneUser,User} from '../../../interfaces/user.interface';
import {UserService} from '../../../service/user/user.service';
import {userObject} from '../../../utils/user.object'
import { roleObject } from '../../../utils/role.object'
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { RolService } from '../../../service/rol/rol.service';
import { Role } from '../../../interfaces/role.interface';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.scss'
})
export class UpdateuserComponent {
  user: GetOneUser = {
    statusCode: 2001,
    message: '获取用户信息中...',
    data: userObject,
    token: '',
  };

  roles: Role[] = [ roleObject ];

  constructor(
    private userService: UserService,
    private roleService: RolService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    this.activateRouter.params.subscribe((params) => {
      this.user.data.id = params['id'];
    })
    this.loadUserById(this.user.data.id)
    this.loadRoles();
  }


  cancel(){
    this.router.navigate(['user/list'])
  }

  loadUserById(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (userData) => {
        this.user = userData;
        console.log(this.user);
      },
      (error) => {
        console.error('Error al cargar usuario por ID:', error);
      }
    );
  }

  loadRoles(): void {
    this.roleService.getRol().subscribe({
      next: (response) => {
        this.roles = response.data;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  updateUser(): void {
    const updateData: UpdateUserDto = {
      name: this.user.data.name,
      lastname: this.user.data.lastname,
      roleId: this.user.data.roleId,
      status: this.user.data.status
    };

    this.userService.updateUser(this.user.data.id, updateData).subscribe(
      (response) => {
        console.log('Usuario actualizado:', response);
        this.router.navigate(['/user/list']);
      },
      (error) => {
        console.error('Error al actualizar usuario:', error);
      }
    );
  }
}
