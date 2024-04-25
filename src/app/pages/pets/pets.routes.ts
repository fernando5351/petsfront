import { Routes } from '@angular/router';
import { GetpetComponent } from './getpet/getpet.component';
import { CreatepetComponent } from './createpet/createpet.component';
import { UpdatepetComponent } from './updatepet/updatepet.component';

export const PetsRouter: Routes = [
  { path: 'list', component: GetpetComponent },
  { path: 'create', component: CreatepetComponent },
  { path: 'update/:id', component: UpdatepetComponent },
  { path: 'details/:id', component: GetpetComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', redirectTo: 'list' }
]
