import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LoadingService } from '../loading/loading.service';
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

}
