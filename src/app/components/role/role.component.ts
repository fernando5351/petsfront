import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Role } from '../../interfaces/role.interface';
import { RolService } from '../../service/rol/rol.service';
import { Router } from '@angular/router';
import { AlertService } from '../../service/alertservice/alertervice.service';
import { ServiceMethodInterface } from '../../interfaces/method.alert.interface';
import { roleObject } from '../../utils/role.object';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})

export class RoleComponent {
  @Input() role: Role = roleObject;

  constructor(
    private rolService: RolService,
    private router: Router,
    private alertService: AlertService
  ){}

  goTo(url: string){
    this.router.navigate([`rol/${url}/${this.role.id}`]);
  }

  delete(){
    const deleMethodService: ServiceMethodInterface<any> = {
      deleteMethod: this.rolService.deleteRol.bind(this.rolService)
    };

    this.alertService.deleteAlert(deleMethodService, this.role.name, this.role.id, '/rol');
  }
}
