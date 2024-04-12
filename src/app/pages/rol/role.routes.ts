import { Routes } from '@angular/router';
import { GetroleComponent } from './getrole/getrole.component';
import { CreateroleComponent } from './createrole/createrole.component';
import { UpdateroleComponent } from './updaterole/updaterole.component';
import { GetOneRolComponent } from './get-one-rol/get-one-rol.component';

export const roleRoutes: Routes = [
  { path: 'create', component: CreateroleComponent },
  { path: 'update/:id', component: UpdateroleComponent },
  { path: 'list', component: GetroleComponent },
  { path: 'details/:id', component: GetOneRolComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', redirectTo: 'list' }
];
