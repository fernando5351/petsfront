import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { LoadingService } from '../loading/loading.service';
import { finalize } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateRol, GetRol, GetRoles, UpdateRol } from '../../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url = `${environment.apiUrl}/role`;

  constructor(
    private loading: LoadingService,
    private http: HttpClient,
  ) { }

  createRol(dto: CreateRol) {
    this.loading.start();
    return this.http.post<GetRol>(`${this.url}`, dto).pipe(
      finalize(()=> {
        this.loading.stop();
      })
    )
  }

  getRol(sort: string = '', order: string = '', limit: number = 10, offset: number = 0) {
    this.loading.start();
    let queryParams = '';

    if (sort !== '' && order !== '') {
        queryParams = `?sort=${sort}&order=${order}&limit=${limit}&offset=${offset}`;
    }

    return this.http.get<GetRoles>(`${this.url}${queryParams}`).pipe(
        finalize(() => {
            this.loading.stop();
        })
    );
  }

  getRolById(id: number) {
    this.loading.start();
    return this.http.get<GetRol>(`${this.url}/${id}`).pipe(
        finalize(() => {
            this.loading.stop();
        })
    );
  }

  searchByName(name: string) {
    this.loading.start();
    const params = new HttpParams().set('name', name)
    return this.http.get<GetRoles>(`${this.url}/search`,  { params }).pipe(
      finalize(()=> {
        this.loading.stop();
      })
    );
  }

  updateRol(id: number, dto: UpdateRol) {
    this.loading.start();
    return this.http.patch<GetRol>(`${this.url}/${id}`, dto).pipe(
      finalize(()=> {
        this.loading.stop();
      })
    );
  }

  deleteRol(id: number){
    this.loading.start();
    return this.http.delete<GetRol>(`${this.url}/${id}`).pipe(
      finalize(()=> {
        this.loading.stop();
      })
    );
  }

}
