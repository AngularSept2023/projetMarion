import { Component, OnInit } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { Passenger } from 'src/app/models/titanic-model';
import { PassengersService } from '../passengers.service';
import { ActivatedRoute } from '@angular/router';
import { TitanicService } from '../../titanic.service';

@Component({
  selector: 'app-passengers-details',
  templateUrl: './passengers-details.component.html',
  styleUrls: ['./passengers-details.component.scss'],
  providers: [{ provide: PassengersService, useClass: PassengersService }],
})
export class PassengersDetailsComponent implements OnInit {
  passenger$: Observable<Passenger[]> | undefined;
  id!: number;
  constructor(
    public passengersService: PassengersService,
    private titanicService: TitanicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.passengersService.getPassenger(this.id);
    // this.passenger$ = this.passengersService.passenger;
    this.passenger$ = this.route.data.pipe(
      switchMap((data) => of(data['product']))
    );
  }

  ngOnChanges(): void {
    this.passenger$ = this.titanicService.getPassenger(this.id)
  }
}
