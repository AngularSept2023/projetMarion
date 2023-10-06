import { Component, inject } from '@angular/core';
import { AuthentificationService } from '../authentification/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  authService = inject(AuthentificationService)
  isLogged = false;

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((value) => this.isLogged = value)
    
  }
}
