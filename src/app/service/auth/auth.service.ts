import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
  ) { }

  saveToken(token: string){
    localStorage.setItem('auth-token', token);
  }

  logOut() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['login']);
  }

}
