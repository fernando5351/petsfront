import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { RoleComponent } from '../../../components/role/role.component';
import { Role } from '../../../interfaces/role.interface';
import { RolService } from '../../../service/rol/rol.service';
import Swal from 'sweetalert2';
import { roleObject } from '../../../utils/role.object';
import { AlertService } from '../../../service/alertservice/alertervice.service';

@Component({
  selector: 'app-getrole',
  standalone: true,
  imports: [RoleComponent, NgOptimizedImage],
  templateUrl: './getrole.component.html',
  styleUrl: './getrole.component.scss'
})
export class GetroleComponent implements OnInit {
  roles: Role[] = [roleObject];

  constructor(
    private router: Router,
    private rolService: RolService,
    private alertService: AlertService
  ){}

  ngOnInit(): void {
    this.loadRoles();
  }

  create() {
    this.router.navigate(['rol/create'])
  }

  loadRoles(){
    this.rolService.getRol().subscribe({
      next: (response) => {
        this.roles = response.data;
      },
      error: (error) => {
        if (error.status !== 401) {
          Swal.fire({
            title: 'error',
            text: error.message,
            icon: 'error',
            position: 'top-end'
          })
          this.alertService.errorAlert('Error', error.message, true, )
        }
      }
    })
  }

  search(event: Event ) {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const name = target.value;

    if (name == '') {
      this.loadRoles();
    }

    if (name) {
      this.rolService.searchByName(name).subscribe({
        next: (response) => {
          this.roles = response.data;
        },
        error: (error)=>{
          if (error.status !== 401) {
            this.loadRoles();
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error',
              timer: 2000,
              toast: true,
              position: 'top-end'
            })
          }
        }
      })
    }

  }
}
