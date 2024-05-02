import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from '../loading/loading.service';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';
import { GetOneUser, auth, changePassword, loginDto } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private url = `${environment.apiUrl}/auth`;

  constructor(
    private router: Router,
    private loading: LoadingService,
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  login(dto: loginDto) {
    this.loading.start();
    return this.http.post<GetOneUser>(`${this.url}/login`, dto).pipe(
      finalize(() => {
        this.loading.stop();
      })
    )
  }

  passwordSetOrUpdate(token: string | null, dto: changePassword) {
    this.loading.start()

    let headers = new HttpHeaders();

    if (token !== null) {
      headers = headers.append('x-recovery-authenticate', token);
    }

    return this.http.post(`${this.url}/recovery-password`, dto, { headers }).pipe(
      finalize(() => {
        this.loading.stop();
      })
    );
  }

  saveToken(response: GetOneUser){
    this.loading.start();
    const dtAuth: auth = {
      user: response.data,
      token: response.token
    }
    this.cookieService.set('user', JSON.stringify(dtAuth), { expires: 7 });
    this.loading.stop();
  }

  getUser() {
    const userCookie = this.cookieService.get('user');
    if (userCookie) {
      try {
        const storage: auth = JSON.parse(userCookie);
        return storage.user ;
      } catch (error) {
        throw `Token no parseado correctamente ${error}`;
      }
    } else {
      return null;
    }
  }

  getToken() {
    const userCookie = this.cookieService.get('user');
    if (userCookie) {
      try {
        const storage: auth = JSON.parse(userCookie);
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
    this.cookieService.delete('user');
    this.router.navigateByUrl('rol', { skipLocationChange: true }).then(() => {
      this.router.navigate(['auth/login']);
    });
    this.loading.stop();
  }

  isUserLoggedIn(): boolean {
    const userCookie = this.cookieService.get('user');
    if (userCookie) {
      try {
        const storage: auth = JSON.parse(userCookie);
        return !!storage.user && !!storage.token;
      } catch (error) {
        console.error('Error al parsear la cookie del usuario:', error);
      }
    }
    return false;
  }
}
