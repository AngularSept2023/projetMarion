import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from 'src/app/models/user-model';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
})
export class InscriptionComponent {
  route = inject(Router);

  inscriptionForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.min(3)]),
    birthday: new FormControl<string>('', [Validators.required]),
    identifiant: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.min(8),
    ]),
  });
  msgError = 'Veuillez remplir tous les champs';
  showError = false;

  public submitForm(): void {
    this.inscriptionForm.markAllAsTouched();
    if (this.inscriptionForm.valid) {
      this.showError = false;
      const newUser = new User({
        name: this.inscriptionForm.controls.name.value ?? '',
        birthday: new Date(this.inscriptionForm.controls.birthday.value ?? ''),
        identifiant: this.inscriptionForm.controls.identifiant.value ?? '',
        password: this.inscriptionForm.controls.name.value ?? 'password',
      });

      this.createUser(newUser);
      this.route.navigate(['/home']);
    } else {
      this.showError = true;
    }
  }

  private createUser(user: User) {
    
  }
}
