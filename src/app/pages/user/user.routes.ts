import { Routes } from '@angular/router';
import  {GetuserComponent} from '../user/getuser/getuser.component';
import  {CreateuserComponent} from '../user/createuser/createuser.component';
import {UpdateuserComponent} from '../user/updateuser/updateuser.component';

export const userRoutes: Routes = [
  { path: 'list', component: GetuserComponent },
  { path:'create', component: CreateuserComponent},
  { path: 'update/:id', component: UpdateuserComponent},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];
