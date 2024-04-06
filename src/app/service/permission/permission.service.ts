import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CreatePemission, Permission, UpdatePermission } from '../../interfaces/role.permissions.interface';

import { LoadingService } from '../loading/loading.service';
import { finalize } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private url = `${environment.apiUrl}/role/permissions`;

  constructor(
    private loading: LoadingService,
    private http: HttpClient
  ) { }

  createPermission(dto: CreatePemission) {
    this.loading.start();
    return this.http.post<Permission>(`${this.url}`, dto).pipe(
      finalize(()=> {
        this.loading.stop();
      })
    )
  }

  getPermissionById(id: number) {
    this.loading.start();
    return this.http.get<Permission>(`${this.url}/${id}`).pipe(
        finalize(() => {
            this.loading.stop();
        })
    );
  }

  updatePermission(id: number, dto: UpdatePermission) {
    this.loading.start();
    return this.http.patch<Permission>(`${this.url}/${id}`, dto).pipe(
      finalize(()=> {
        this.loading.stop();
      })
    );
  }

  deletePermission(id: number){
    this.loading.start();
    return this.http.delete<Permission>(`${this.url}/${id}`).pipe(
      finalize(()=> {
        this.loading.stop();
      })
    );
  }

}
