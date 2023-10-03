import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Passenger } from '../models/titanic-model';

@Injectable({
  providedIn: 'root',
})
export class TitanicService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPassengers(): Observable<Passenger[]> {
    return this.http
      .get<Passenger[]>(`${this.baseUrl}/passengers`)
      .pipe((passengers) => {
        return passengers;
      });
  }

  getPassenger(id: number): Observable<Passenger[]> {
    return this.http
      .get<Passenger[]>(`${this.baseUrl}/passengers?PassengerId=${id}`)
      .pipe((passenger) => {
        return passenger;
      });
  }
}
