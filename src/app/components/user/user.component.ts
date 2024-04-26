import { Component,Input } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {AlertService} from '../../service/alertservice/alertervice.service';
import {userObject} from '../../utils/user.object';
import {ServiceMethodInterface} from '../../interfaces/method.alert.interface';
import {User} from '../../interfaces/user.interface'
import { UserService } from '../../service/user/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @Input() user: User = userObject;

    constructor(
      private userService: UserService,
      private alertService: AlertService,
      private router: Router
    ){}

    deleteUser(){
      const deleteMethoService: ServiceMethodInterface<any> = {
        deleteMethod: this.userService.deleteUser.bind(this.userService)
      };

      this.alertService.deleteAlert(deleteMethoService, this.user.name, this.user.id, 'user')
    }
  }
