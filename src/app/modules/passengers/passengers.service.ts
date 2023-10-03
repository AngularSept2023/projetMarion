import { Injectable } from '@angular/core';
import { Passenger } from 'src/app/models/titanic-model';
import { BehaviorSubject, Subscription, tap, map } from 'rxjs';
import { TitanicService } from '../titanic.service';
import { MatTableDataSource } from '@angular/material/table';

@Injectable()
export class PassengersService {
  passengers!: Passenger[];
  passengersSub!: Subscription | undefined;
  passenger: BehaviorSubject<Passenger> = new BehaviorSubject(
    new Passenger({ Name: 'Lola' })
  );
  constructor(private titanicService: TitanicService) {}

  public getPassengers() {
    this.passengersSub = this.titanicService
      .getPassengers()
      .subscribe((passengers) => {
        this.passengers = passengers;
      });
  }

  public getPassenger(id: number) {
    this.titanicService.getPassenger(id).subscribe((value) => {
      this.passenger.next(value[0]);
    });
  }
}
