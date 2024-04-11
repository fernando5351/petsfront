import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading/loading.service';
import { finalize } from 'rxjs';
import { GetOneUser, auth, loginDto } from '../../interfaces/user.interface';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private url = `${environment.apiUrl}/auth`;
 // private localStorage: Storage | undefined = undefined;

  constructor(
    private router: Router,
    private loading: LoadingService,
    private http: HttpClient
    //@Inject(DOCUMENT) private document: Document
  ) {
    //this.localStorage = this.document.defaultView?.localStorage;
  }


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
    localStorage?.setItem('user', JSON.stringify(dtAuth));
    this.loading.stop();
  }

  getUser() {
    if (localStorage?.getItem('user')) {
      try {
        const storage: auth = JSON.parse(localStorage?.getItem('user')!);
        return storage.user ;
      } catch (error) {
        throw `Token no parseado correctamente ${error}`;
      }
    } else {
      return null;
    }
  }

  getToken() {
    if (localStorage?.getItem('user')) {
      try {
        const storage: auth = JSON.parse(localStorage?.getItem('user')!);
        return storage.token;
      } catch (error) {
        throw `Token no parseado correctamente ${error}`;
      }
    } else {
      return null;
    }
  }

  logOut() {
    this.loading.start();
    localStorage?.removeItem('user');
    this.router.navigate(['login']);
    this.loading.stop();
  }

  isUserLogedIn() {
    if (localStorage?.getItem('user') !== null) {
      return true;
    } else {
      return false;
    }
  }

}
