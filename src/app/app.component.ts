import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from './modules/authentification/authentification.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'Titanic_Marion';

  isLogged!: boolean;

  constructor(public authService: AuthentificationService) {
    
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((value) => this.isLogged = value)
    
  }
}
