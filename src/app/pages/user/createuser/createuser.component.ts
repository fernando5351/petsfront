import { Component } from '@angular/core';
import { CreateUserDto } from '../../../interfaces/user.interface';
import {UserService} from '../../../service/user/user.service'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { log } from 'console';


@Component({
  selector: 'app-createuser',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.scss'
})
export class CreateuserComponent {

  newUser: CreateUserDto = {
    roleId: 0,
    name: '',
    email: '',
    lastname: '',
    password: '',
    status: true,
  }

  constructor(
    private userService: UserService,
    private router: Router) {}

    createUser():void{
      this.userService.createUser(this.newUser).subscribe({
        next:(response)=>{
          console.log('User created succesfully', response);
        },
        error:(error)=> {
          console.log('Error', error);

        }
      })
    }
}
