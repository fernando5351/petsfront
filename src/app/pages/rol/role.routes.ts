import { Routes } from '@angular/router';
import { GetroleComponent } from './getrole/getrole.component';
import { CreateroleComponent } from './createrole/createrole.component';
import { UpdateroleComponent } from './updaterole/updaterole.component';

export const roleRoutes: Routes = [
  { path: 'create', component: CreateroleComponent },
  { path: 'update', component: UpdateroleComponent },
  { path: 'list', component: GetroleComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', redirectTo: 'list' }
];
