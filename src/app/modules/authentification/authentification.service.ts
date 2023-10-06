import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  // private TOKEN = new InjectionToken<User>('AmjhLKJFlksdf65sdfzedfsd4');

  private baseUrl = 'http://localhost:3000';
  isLogged = false;
  isLogged$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(identifiants: string, password: string): Observable<any> {
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      map((users) => {
        console.log(users);
        const user = users.find((user) => {
          return (
            user.identifiant === identifiants && user.password === password
          );
        });
        if (typeof user === 'object') {
          this.isLogged = true;
          this.isLogged$.next(true);
        } else {
          throw Error;
        }

        return this.router.navigate(['/home']);
      }),
      catchError((err) => {
        return throwError(() => 'Identifiants ou mot de passe incorrect.');
      })
    );
  }

  logout() {
    this.isLogged = false;
    this.isLogged$.next(false);
    return this.router.navigate(['/home']);
  }
}
