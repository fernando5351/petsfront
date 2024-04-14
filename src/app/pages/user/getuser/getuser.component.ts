import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserComponent} from '../../../components/user/user.component';
import {User} from '../../../interfaces/user.interface'
import {UserService} from '../../../service/user/user.service'
import { response } from 'express';

@Component({
  selector: 'app-getuser',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './getuser.component.html',
  styleUrl: './getuser.component.scss'
})
export class GetuserComponent {
  users: User[] =[{
    id: 0,
    password: '',
    email: '',
    name: 'Chomin',
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
    },
  }]

  constructor(
    private router: Router,
    private userSerive: UserService
  ){}


  ngOnInit():void{
    this.loadUsers()
  }

  create(){
    this.router.navigate(['user/create'])
  }


  loadUsers(){
    this.userSerive.getUsers().subscribe({
      next:(response) =>{
        console.log(response);
        this.users = response.data;
      },
      error:(error)=>{
        console.log(error);

      }
    })
  }

}
