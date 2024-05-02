import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserComponent} from '../../../components/user/user.component';
import {User} from '../../../interfaces/user.interface'
import {UserService} from '../../../service/user/user.service'
import { userObject } from '../../../utils/user.object';
import { AlertService } from '../../../service/alertservice/alertervice.service';

@Component({
  selector: 'app-getuser',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './getuser.component.html',
  styleUrl: './getuser.component.scss'
})
export class GetuserComponent implements OnInit {
  users: User[] = [userObject];

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
        console.log(error)
      }
    })
  }

}
