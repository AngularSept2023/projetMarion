import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthentificationService } from '../authentification.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, BrowserModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {
  showError = false;
  loginForm = new FormGroup({
    identifiant: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });

  msgError = 'Veuillez remplir tous les champs';

  authService = inject(AuthentificationService);

  public submitForm() {
    if (
      this.loginForm.controls.identifiant.value &&
      this.loginForm.controls.password.value
    ) {
      this.showError = false;
      this.authService.login(
        this.loginForm.controls.identifiant.value,
        this.loginForm.controls.password.value
      ).subscribe();
    } else this.showError = true;
  }
}
