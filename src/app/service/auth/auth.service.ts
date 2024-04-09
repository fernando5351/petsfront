import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading/loading.service';
import { finalize } from 'rxjs';
import { GetOneUser, User, auth, loginDto } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url = `${environment.apiUrl}/auth`;

  constructor(
    private router: Router,
    private loading: LoadingService,
    private http: HttpClient
  ) { }

  login(dto: loginDto) {
    this.loading.start();
    return this.http.post<GetOneUser>(`${this.url}/login`, dto).pipe(
      finalize(()=> {
        this.loading.stop();
      })
    )
  }

  saveToken(response: GetOneUser){
    this.loading.start();
    const dtAuth: auth = {
      user: response.data,
      token: response.token
    }
    console.log(dtAuth);
    localStorage.setItem('user', JSON.stringify(dtAuth));
    this.loading.stop();
  }

  getToken() {
    if (localStorage.getItem('user')) {
      try {
        const token: auth = JSON.parse(localStorage.getItem('user')!);
        return token;
      } catch (error) {
        console.log("Parse error", error);
        return null;
      }
    } else {
      return null;
    }
  }

  logOut() {
    this.loading.start();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
    this.loading.stop();
  }

  isUserLogedIn() {
    if (localStorage.getItem('user') !== null) {
      return true;
    } else {
      return false;
    }
  }

}
