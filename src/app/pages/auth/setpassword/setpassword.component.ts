import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../../service/alertservice/alertervice.service';
import { AuthService } from '../../../service/auth/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { changePassword } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-setpassword',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './setpassword.component.html',
  styleUrl: './setpassword.component.scss'
})
export class SetPasswordComponent {
  passwordForm: FormGroup;
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  showPassword: { [key: string]: boolean } = {
    password: false,
    confirmPassword: false
  };
  invalidForm: boolean = false;
  token: string | null;
  lowercaseRegex = /[a-z]/;
  uppercaseRegex = /[A-Z]/;
  numberRegex = /[0-9]/;
  specialCharacterRegex = /[@$!%*?&]/;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      confirmPassword: ['', Validators.required]
    });

    this.passwordForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.passwordsMatchAndLength();
    });
  }

  togglePasswordVisibility(controlName: string): void {
    this.showPassword[controlName] = !this.showPassword[controlName];
  }

  passwordsMatchAndLength(): void {
    const password = this.passwordForm.get('password')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;

    const passwordLength = password.length;
    const confirmPasswordLength = confirmPassword.length;

    this.invalidForm = password !== confirmPassword || passwordLength !== confirmPasswordLength;
  }

  onSubmit() {
    const password = this.passwordForm.get('password')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;

    if (password.trim() === '' || confirmPassword.trim() === '') {
      this.alertService.errorAlert('Error', 'Todos los campos son requeridos');
      return;
    }
    if (password !== confirmPassword) {
      this.alertService.errorAlert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const dto: changePassword = {
      password: password,
      repeatNewPassword: confirmPassword
    };

    this.authService.passwordSetOrUpdate(this.token, dto).subscribe({
      next: (response) => {
        this.router.navigate(['home']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
