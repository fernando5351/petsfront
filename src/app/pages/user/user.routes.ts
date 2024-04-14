import { Routes } from '@angular/router';
import  {GetuserComponent} from '../user/getuser/getuser.component'
import  {CreateuserComponent} from '../user/createuser/createuser.component'

export const userRoutes: Routes = [
  { path: 'list', component: GetuserComponent },
  { path:'create', component: CreateuserComponent},
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];
