
import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RecoveryComponent } from "./recovery/recovery.component";
import { SetPasswordComponent } from "./setpassword/setpassword.component";

export const AuthRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recovery', component: RecoveryComponent },
  { path: 'setpassword', component: SetPasswordComponent },
]
