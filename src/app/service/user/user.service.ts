import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LoadingService } from '../loading/loading.service';
import {User,CreateUserDto,GetAllUsers,GetOneUser,UpdateUserDto} from '../../interfaces/user.interface'
import { finalize } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${environment.apiUrl}/user`;

  constructor(
    private loading: LoadingService,
    private http: HttpClient
  ) { }

  createUser(dto: CreateUserDto){
    this.loading.start();
    return this.http.post<GetOneUser>(`${this.url}/register`, dto).pipe(
      finalize(()=>{
        this.loading.stop()
      })
    )
  }

  getUsers(){
    this.loading.start();
    return this.http.get<GetAllUsers>(`${this.url}`).pipe(
      finalize(() => {
        this.loading.stop()
      }
    )
  )
  }


  updateUser(id: number, dto: UpdateUserDto) {
    this.loading.start();
    return this.http.patch<GetOneUser>(`${this.url}/${id}`, dto).pipe(
      finalize(() => this.loading.stop())
    );
  }

  deleteUser(id: number) {
    this.loading.start();
    return this.http.delete<GetOneUser>(`${this.url}/${id}`).pipe(
      finalize(() => this.loading.stop())
    );
  }


}

