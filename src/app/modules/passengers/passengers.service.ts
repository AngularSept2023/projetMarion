import { Injectable } from '@angular/core';
import { Passenger } from 'src/app/models/titanic-model';
import { BehaviorSubject, Subscription, tap, map, Observable } from 'rxjs';
import { TitanicService } from '../titanic.service';

@Injectable()
export class PassengersService {
  // passengersTab = new MatTableDataSource<Passenger>([]);
  passengersSub!: Subscription | undefined;
  passenger: BehaviorSubject<Passenger> = new BehaviorSubject(
    new Passenger({ Name: 'Lola' })
  );
  passengers!: Passenger[];
  constructor(private titanicService: TitanicService) {
    this.getPassengers();
  }
  public getPassengers() {
    this.passengersSub = this.titanicService
      .getPassengers()
      .subscribe((passengers) => {
        console.log(passengers);
        this.passengers = passengers;
        // this.passengersTab = new MatTableDataSource(passengers);
      });
  }
  public getPassenger(id: number) {
    this.titanicService.getPassenger(id).subscribe((value) => {
      this.passenger.next(value[0]);
    });
  }
}
